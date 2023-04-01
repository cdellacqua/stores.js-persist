# @universal-stores/persist

A collection of stores and storage mechanisms for persisting and retrieving data to and from different sources, synchronously or asynchronously.

This package is based on [universal-stores](https://www.npmjs.com/package/universal-stores),
which are observable containers of values.

[NPM Package](https://www.npmjs.com/package/@universal-stores/persist)

`npm install @universal-stores/persist`

[Documentation](./docs/README.md)

## Highlights

### Async and Sync implementation

This package provides two factory functions: `makePersistentStore` and `makeAsyncPersistentStore`.
They can be used to create both sync and async stores.

For async stores, `.set(...)` and `.update(...)` return a promise that resolves once the data
is successfully persisted to the underlying storage mechanism.

### Built-ins for common use cases

When you create a persistent store, both factory functions need a storage object, that is an object
that implements read, write and delete operations.

You can can use one of the built-ins provided in this package, such as:

- WebStorageAdapters.local, WebStorageAdapters.session
- RESTStorageAdapters.textAsync, FileStorageAdapters.jsonAsync
- FileStorageAdapters.textSync, FileStorageAdapters.jsonSync, FileStorageAdapters.textAsync, FileStorageAdapters.jsonAsync

Or you can create your own by providing an object that implements `ItemStorage` or `AsyncItemStorage`, depending
on whether you need a synchronous or asynchronous store.

## Example use cases

### Bind a store to a REST endpoint

An async store can be used to fetch data from and persist data to a REST endpoint. RESTStorageAdapters contains presets
for JSON and plain text adapters, but you can easily
configure the "raw" `RESTStorageAdapters.async` adapter to
handle other data formats.

```ts
import {
	makeAsyncPersistentStore,
	RESTStorageAdapters,
} from '@universal-stores/persist';

const todos$ = makeAsyncPersistentStore<string[]>([], {
	storage: RESTStorageAdapters.jsonAsync('http://localhost:3000/todos.json'),
});
todos$.fetch().catch((err) => console.warn("couldn't fetch TODOs")); // fetch content from the API if available.

todos$.subscribe(console.log); // will print [] immediately, as it is the initial value of the store,
// followed by the parsed content of "todos.json" requested by the `.fetch()` call.
```

For more examples on how to use the REST adapter, check out the tests here: [rest.test.ts](./tests/storage-adapters/rest.test.ts).

### Bind a store to a custom async source

Async stores are quite flexible when it comes to storage adapters. You can provide your own by simply
passing an object that implements `set`, `get` and `clear`.

Here is an example that uses tRPC with a query-able only
resource:

```ts
import {makeAsyncPersistentStore} from '@universal-stores/persist';

const todos$ = makeAsyncPersistentStore<string[]>([], {
	storage: {
		get(options) {
			return trpc.todos.query({signal: options?.signal});
		},
		set: () => Promise.reject(new Error('not supported')),
		clear: () => Promise.reject(new Error('not supported')),
	},
});
todos$.fetch().catch((err) => console.warn("couldn't fetch TODOs")); // fetch content from the API if available.

todos$.subscribe(console.log); // will print [] immediately, as it is the initial value of the store,
// followed by the parsed content returned by the tRPC query.
```

### Persisting client-side data in the local storage

A client-side "TODO list" could be represented in its simplest
form as an array of strings.

An implementation could use a persistent store that saves
data to the localStorage, as you can see in the following example:

```ts
import {
	makePersistentStore,
	WebStorageAdapters,
} from '@universal-stores/persist';

const todos$ = makePersistentStore<string[]>([], {
	storage: WebStorageAdapters.local('todos'),
});
todos$.fetch(); // fetch content from local storage if available.

console.log(todos$.content()); // will print [] the first time, and ['drink coffee', 'read the newsletter'] after reloading the page, due to the `.set()` call below.

todos$.set(['drink coffee', 'read the newsletter']); // will persist the array to the local storage.
```

The first parameter of `makePersistentStore` is the default value of
the store, while the second parameter is a configuration object.
The default value is used as the store value until `.fetch()` or `.set(...)/.update(...)` are called.
This key is the only parameter we passed to the `WebStorageAdapters.local` function. This function creates an
adapter that manages I/O operations on the localStorage of the browser.

The `set` method that would normally update the value of the store and
propagate the information to all its subscribers, will also call
`localStorage.setItem('todos', JSON.stringify(<current value>))` under the hood to persist the data.

The configuration object also accepts custom serialization/deserialization functions to let you
persist complex types that may not have a 1:1 representation in JSON (e.g. Date).

### Persisting data to a file

```ts
import {
	makePersistentStore,
	FileStorageAdapters,
} from '@universal-stores/persist';

const todos$ = makePersistentStore<string[]>([], {
	storage: FileStorageAdapters.jsonSync('todos.txt'),
});
todos$.fetch(); // fetch content from todos.txt if available.

console.log(todos$.content()); // will print [] the first time, and ['drink coffee', 'read the newsletter'] after relaunching the script, due to the `.set()` call below.

todos$.set(['drink coffee', 'read the newsletter']); // will persist the array to todos.txt
```

### Custom serialization/deserialization

```ts
import {
	makePersistentStore,
	FileStorageAdapters,
} from '@universal-stores/persist';

const data$ = makePersistentStore<Uint8Array>(new Uint8Array(), {
	storage: FileStorageAdapters.sync('data.bin', {
		serde: {
			serialize: (content) => Buffer.from(content),
			deserialize: (buffer) => new Uint8Array(buffer),
		},
	}),
});
data$.fetch();

console.log(data$.content()); // will print `Uint8Array(0) []` the first time, and `Uint8Array(3) [ 1, 2, 3 ]` after relaunching the script, due to the `.set()` call below.

data$.set(new Uint8Array([1, 2, 3]));
```
