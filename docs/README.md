@universal-stores/persist

# @universal-stores/persist

## Table of contents

### Classes

- [JSONDeserializationError](classes/JSONDeserializationError.md)

### Type Aliases

- [AsyncItemStorage](README.md#asyncitemstorage)
- [AsyncPersistentStore](README.md#asyncpersistentstore)
- [AsyncPersistentStoreConfig](README.md#asyncpersistentstoreconfig)
- [AsyncPersistentStoreStartHandler](README.md#asyncpersistentstorestarthandler)
- [AsyncPersistentStoreState](README.md#asyncpersistentstorestate)
- [AsyncSerde](README.md#asyncserde)
- [AsyncSetter](README.md#asyncsetter)
- [AsyncUpdate](README.md#asyncupdate)
- [DerivedStoreConfig](README.md#derivedstoreconfig)
- [EqualityComparator](README.md#equalitycomparator)
- [Getter](README.md#getter)
- [HttpVerb](README.md#httpverb)
- [HttpVerbWithBody](README.md#httpverbwithbody)
- [HttpVerbsWithoutBody](README.md#httpverbswithoutbody)
- [ItemStorage](README.md#itemstorage)
- [ObservableAsyncItemStorage](README.md#observableasyncitemstorage)
- [ObservableItemStorage](README.md#observableitemstorage)
- [PartialRESTAsyncStorageAdapterConfig](README.md#partialrestasyncstorageadapterconfig)
- [PersistentStore](README.md#persistentstore)
- [PersistentStoreConfig](README.md#persistentstoreconfig)
- [ReadonlyStore](README.md#readonlystore)
- [RestAsyncStorageAdapterConfig](README.md#restasyncstorageadapterconfig)
- [Serde](README.md#serde)
- [Setter](README.md#setter)
- [StartHandler](README.md#starthandler)
- [StopHandler](README.md#stophandler)
- [Store](README.md#store)
- [StoreConfig](README.md#storeconfig)
- [Subscriber](README.md#subscriber)
- [Unsubscribe](README.md#unsubscribe)
- [Update](README.md#update)
- [Updater](README.md#updater)

### Variables

- [FileStorageAdapters](README.md#filestorageadapters)
- [InMemoryStorageAdapters](README.md#inmemorystorageadapters)
- [RESTStorageAdapters](README.md#reststorageadapters)
- [WebStorageAdapters](README.md#webstorageadapters)

### Functions

- [makeAsyncPersistentStore](README.md#makeasyncpersistentstore)
- [makeDerivedStore](README.md#makederivedstore)
- [makeJSONSerde](README.md#makejsonserde)
- [makePersistentStore](README.md#makepersistentstore)
- [makeReadonlyStore](README.md#makereadonlystore)
- [makeStore](README.md#makestore)

## Type Aliases

### AsyncItemStorage

Ƭ **AsyncItemStorage**<`T`\>: `Object`

An asynchronous single item storage that provides a set of common methods.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `clear` | (`options?`: { `signal?`: `AbortSignal`  }) => `Promise`<`void`\> |
| `get` | (`options?`: { `signal?`: `AbortSignal`  }) => `Promise`<`undefined` \| `T`\> |
| `set` | (`value`: `T`, `options?`: { `signal?`: `AbortSignal`  }) => `Promise`<`void`\> |

#### Defined in

[src/lib/storage-adapters/shared.ts:70](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/shared.ts#L70)

___

### AsyncPersistentStore

Ƭ **AsyncPersistentStore**<`T`\>: `Omit`<[`Store`](README.md#store)<`T`\>, ``"set"`` \| ``"update"``\> & { `fetch`: (`options?`: { `signal?`: `AbortSignal`  }) => `Promise`<`T` \| `undefined`\> ; `persist`: (`options?`: { `signal?`: `AbortSignal`  }) => `Promise`<`void`\> ; `set`: [`AsyncSetter`](README.md#asyncsetter)<`T`\> ; `setCache`: [`Setter`](README.md#setter)<`T`\> ; `state$`: [`ReadonlyStore`](README.md#readonlystore)<[`AsyncPersistentStoreState`](README.md#asyncpersistentstorestate)\> ; `storage`: [`AsyncItemStorage`](README.md#asyncitemstorage)<`T`\> ; `update`: [`AsyncUpdate`](README.md#asyncupdate)<`T`\> ; `updateCache`: [`Update`](README.md#update)<`T`\>  }

A Persistent store that supports asynchronous operations.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/lib/async-persistent.ts:30](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/async-persistent.ts#L30)

___

### AsyncPersistentStoreConfig

Ƭ **AsyncPersistentStoreConfig**<`T`\>: `Object`

Configuration object used to initialize the Persistent Store.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `maxPendingOperations?` | `number` | (optional, defaults to 100) The maximum number of async operations that can be enqueued before starting to reject. |
| `start?` | [`AsyncPersistentStoreStartHandler`](README.md#asyncpersistentstorestarthandler)<`T`\> | (optional) A start function that will be called once the store has at least one subscriber and optionally returns a stop function that will be called once the store has no remaining subscribers. |
| `storage` | [`AsyncItemStorage`](README.md#asyncitemstorage)<`T`\> \| [`ObservableAsyncItemStorage`](README.md#observableasyncitemstorage)<`T`\> | A storage. |

#### Defined in

[src/lib/async-persistent.ts:68](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/async-persistent.ts#L68)

___

### AsyncPersistentStoreStartHandler

Ƭ **AsyncPersistentStoreStartHandler**<`T`\>: (`set`: (`value`: `T`) => `Promise`<`void`\>) => `void` \| () => `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`set`): `void` \| () => `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `set` | (`value`: `T`) => `Promise`<`void`\> |

##### Returns

`void` \| () => `void`

#### Defined in

[src/lib/async-persistent.ts:61](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/async-persistent.ts#L61)

___

### AsyncPersistentStoreState

Ƭ **AsyncPersistentStoreState**: ``"ready"`` \| ``"persisting"`` \| ``"fetching"``

Possible states of an AsyncPersistentStore.

#### Defined in

[src/lib/async-persistent.ts:16](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/async-persistent.ts#L16)

___

### AsyncSerde

Ƭ **AsyncSerde**<`TSerializable`, `TSerialized`, `TDeserializable`\>: `Object`

An asynchronous serializer/deserializer.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSerializable` | `TSerializable` |
| `TSerialized` | `TSerialized` |
| `TDeserializable` | `TSerialized` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `deserialize` | (`serialized`: `TDeserializable`) => `TSerializable` \| `Promise`<`TSerializable`\> |
| `serialize` | (`deserialized`: `TSerializable`) => `TSerialized` \| `Promise`<`TSerialized`\> |

#### Defined in

[src/lib/storage-adapters/shared.ts:20](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/shared.ts#L20)

___

### AsyncSetter

Ƭ **AsyncSetter**<`T`\>: (`v`: `T`, `options?`: { `signal?`: `AbortSignal`  }) => `Promise`<`void`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`v`, `options?`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `T` |
| `options?` | `Object` |
| `options.signal?` | `AbortSignal` |

##### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/async-persistent.ts:18](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/async-persistent.ts#L18)

___

### AsyncUpdate

Ƭ **AsyncUpdate**<`T`\>: (`updater`: [`Updater`](README.md#updater)<`T`\>, `options?`: { `signal?`: `AbortSignal`  }) => `Promise`<`void`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`updater`, `options?`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `updater` | [`Updater`](README.md#updater)<`T`\> |
| `options?` | `Object` |
| `options.signal?` | `AbortSignal` |

##### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/async-persistent.ts:22](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/async-persistent.ts#L22)

___

### DerivedStoreConfig

Ƭ **DerivedStoreConfig**<`T`\>: `Object`

Configurations for derived stores.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `comparator?` | [`EqualityComparator`](README.md#equalitycomparator)<`T`\> | (optional, defaults to `(a, b) => a === b`) a function that's used to determine if the current value of the store value is different from the one being set and thus if the store needs to be updated and the subscribers notified. |

#### Defined in

node_modules/universal-stores/dist/composition.d.ts:15

___

### EqualityComparator

Ƭ **EqualityComparator**<`T`\>: (`a`: `T`, `b`: `T`) => `boolean`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`a`, `b`): `boolean`

A comparison function used to optimize subscribers notifications. Used in [Store](README.md#store)

##### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `T` |
| `b` | `T` |

##### Returns

`boolean`

#### Defined in

node_modules/universal-stores/dist/index.d.ts:24

___

### Getter

Ƭ **Getter**<`T`\>: () => `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (): `T`

A generic getter function. Used in [Store](README.md#store)

##### Returns

`T`

#### Defined in

node_modules/universal-stores/dist/index.d.ts:18

___

### HttpVerb

Ƭ **HttpVerb**: [`HttpVerbsWithoutBody`](README.md#httpverbswithoutbody) \| [`HttpVerbWithBody`](README.md#httpverbwithbody)

#### Defined in

[src/lib/storage-adapters/rest.ts:6](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/rest.ts#L6)

___

### HttpVerbWithBody

Ƭ **HttpVerbWithBody**: ``"POST"`` \| ``"PUT"`` \| ``"PATCH"`` \| ``"DELETE"``

#### Defined in

[src/lib/storage-adapters/rest.ts:5](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/rest.ts#L5)

___

### HttpVerbsWithoutBody

Ƭ **HttpVerbsWithoutBody**: ``"GET"``

#### Defined in

[src/lib/storage-adapters/rest.ts:4](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/rest.ts#L4)

___

### ItemStorage

Ƭ **ItemStorage**<`T`\>: `Object`

A single item storage that provides a set of common methods.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `clear` | () => `void` |
| `get` | () => `undefined` \| `T` |
| `set` | (`value`: `T`) => `void` |

#### Defined in

[src/lib/storage-adapters/shared.ts:40](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/shared.ts#L40)

___

### ObservableAsyncItemStorage

Ƭ **ObservableAsyncItemStorage**<`T`\>: [`AsyncItemStorage`](README.md#asyncitemstorage)<`T`\> & { `change$`: `ReadonlySignal`<`T`\> ; `unobserve`: () => `void`  }

An asynchronous single item storage that provides a set of common methods and a `change$` signal to listen
for external modifications to the content of the storage.

Note: when disposing of this type of storage, make sure to call `.unobserve()`, so that
all the associated resource may be properly freed (e.g. a file system watcher, an event listener on the Window, etc.).

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/lib/storage-adapters/shared.ts:92](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/shared.ts#L92)

___

### ObservableItemStorage

Ƭ **ObservableItemStorage**<`T`\>: [`ItemStorage`](README.md#itemstorage)<`T`\> & { `change$`: `ReadonlySignal`<`T`\> ; `unobserve`: () => `void`  }

A single item storage that provides a set of common methods and a `change$` signal to listen
for external modifications to the content of the storage.

Note: when disposing of this type of storage, make sure to call `.unobserve()`, so that
all the associated resource may be properly freed (e.g. a file system watcher, an event listener on the Window, etc.).

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/lib/storage-adapters/shared.ts:62](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/shared.ts#L62)

___

### PartialRESTAsyncStorageAdapterConfig

Ƭ **PartialRESTAsyncStorageAdapterConfig**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `fetchOptions?` | { `credentials?`: `RequestCredentials` ; `headers?`: `HeadersInit` ; `redirect?`: `RequestRedirect`  } | Options that overrides the default fetch configuration. |
| `fetchOptions.credentials?` | `RequestCredentials` | - |
| `fetchOptions.headers?` | `HeadersInit` | - |
| `fetchOptions.redirect?` | `RequestRedirect` | - |
| `verbs?` | { `clear?`: [`HttpVerb`](README.md#httpverb) ; `get?`: [`HttpVerb`](README.md#httpverb) ; `set?`: [`HttpVerbWithBody`](README.md#httpverbwithbody)  } | HTTP verbs that should be used to interact with the remote resource. |
| `verbs.clear?` | [`HttpVerb`](README.md#httpverb) | - |
| `verbs.get?` | [`HttpVerb`](README.md#httpverb) | - |
| `verbs.set?` | [`HttpVerbWithBody`](README.md#httpverbwithbody) | - |

#### Defined in

[src/lib/storage-adapters/rest.ts:27](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/rest.ts#L27)

___

### PersistentStore

Ƭ **PersistentStore**<`T`\>: [`Store`](README.md#store)<`T`\> & { `fetch`: () => `T` \| `undefined` ; `persist`: () => `void` ; `setCache`: [`Setter`](README.md#setter)<`T`\> ; `storage`: [`ItemStorage`](README.md#itemstorage)<`T`\> ; `updateCache`: [`Update`](README.md#update)<`T`\>  }

A Persistent store that supports synchronous operations.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/lib/persistent.ts:7](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/persistent.ts#L7)

___

### PersistentStoreConfig

Ƭ **PersistentStoreConfig**<`T`\>: `Object`

Configuration object used to initialize the Persistent Store.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `start?` | (`set`: (`value`: `T`) => `void`) => `void` \| () => `void` | (optional) A start function that will be called once the store has at least one subscriber and optionally returns a stop function that will be called once the store has no remaining subscribers. |
| `storage` | [`ItemStorage`](README.md#itemstorage)<`T`\> \| [`ObservableItemStorage`](README.md#observableitemstorage)<`T`\> | The underlying storage handler for this store. |

#### Defined in

[src/lib/persistent.ts:29](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/persistent.ts#L29)

___

### ReadonlyStore

Ƭ **ReadonlyStore**<`T`\>: `Object`

A store that can have subscribers and emit values to them. It also
provides the current value upon subscription. It's readonly in the
sense that it doesn't provide direct set/update methods, unlike [Store](README.md#store),
therefore its value can only be changed by a [StartHandler](README.md#starthandler) (see also [makeReadonlyStore](README.md#makereadonlystore)).

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `content` | () => `T` |
| `nOfSubscriptions` | () => `number` |
| `subscribe` | (`subscriber`: [`Subscriber`](README.md#subscriber)<`T`\>) => [`Unsubscribe`](README.md#unsubscribe) |

#### Defined in

node_modules/universal-stores/dist/index.d.ts:35

___

### RestAsyncStorageAdapterConfig

Ƭ **RestAsyncStorageAdapterConfig**<`T`, `TBody`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `TBody` | `T` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `bodyExtractor` | (`response`: `Response`) => `Promise`<`TBody`\> | A function that, given the fetch response object, returns the useful content that needs to be deserialized. |
| `fetchOptions?` | { `credentials?`: `RequestCredentials` ; `headers?`: `HeadersInit` ; `redirect?`: `RequestRedirect`  } | Options that overrides the default fetch configuration. |
| `fetchOptions.credentials?` | `RequestCredentials` | - |
| `fetchOptions.headers?` | `HeadersInit` | - |
| `fetchOptions.redirect?` | `RequestRedirect` | - |
| `serde` | [`AsyncSerde`](README.md#asyncserde)<`T`, `BodyInit`, `TBody`\> | A serializer/deserializer. |
| `verbs?` | { `clear?`: [`HttpVerb`](README.md#httpverb) ; `get?`: [`HttpVerb`](README.md#httpverb) ; `set?`: [`HttpVerbWithBody`](README.md#httpverbwithbody)  } | HTTP verbs that should be used to interact with the remote resource. |
| `verbs.clear?` | [`HttpVerb`](README.md#httpverb) | - |
| `verbs.get?` | [`HttpVerb`](README.md#httpverb) | - |
| `verbs.set?` | [`HttpVerbWithBody`](README.md#httpverbwithbody) | - |

#### Defined in

[src/lib/storage-adapters/rest.ts:8](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/rest.ts#L8)

___

### Serde

Ƭ **Serde**<`TSerializable`, `TSerialized`, `TDeserializable`\>: `Object`

A serializer/deserializer.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSerializable` | `TSerializable` |
| `TSerialized` | `TSerialized` |
| `TDeserializable` | `TSerialized` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `deserialize` | (`serialized`: `TDeserializable`) => `TSerializable` |
| `serialize` | (`deserialized`: `TSerializable`) => `TSerialized` |

#### Defined in

[src/lib/storage-adapters/shared.ts:6](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/shared.ts#L6)

___

### Setter

Ƭ **Setter**<`T`\>: (`newValue`: `T`) => `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`newValue`): `void`

A generic setter function. Used in [Store](README.md#store)

##### Parameters

| Name | Type |
| :------ | :------ |
| `newValue` | `T` |

##### Returns

`void`

#### Defined in

node_modules/universal-stores/dist/index.d.ts:16

___

### StartHandler

Ƭ **StartHandler**<`T`\>: (`set`: [`Setter`](README.md#setter)<`T`\>) => [`StopHandler`](README.md#stophandler) \| `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`set`): [`StopHandler`](README.md#stophandler) \| `void`

A function that gets called once a store gets at least one subscriber. Used in [Store](README.md#store)

##### Parameters

| Name | Type |
| :------ | :------ |
| `set` | [`Setter`](README.md#setter)<`T`\> |

##### Returns

[`StopHandler`](README.md#stophandler) \| `void`

#### Defined in

node_modules/universal-stores/dist/index.d.ts:28

___

### StopHandler

Ƭ **StopHandler**: () => `void`

#### Type declaration

▸ (): `void`

A function that gets called once a store reaches 0 subscribers. Used in [Store](README.md#store)

##### Returns

`void`

#### Defined in

node_modules/universal-stores/dist/index.d.ts:26

___

### Store

Ƭ **Store**<`T`\>: [`ReadonlyStore`](README.md#readonlystore)<`T`\> & { `set`: (`v`: `T`) => `void` ; `update`: (`updater`: [`Updater`](README.md#updater)<`T`\>) => `void`  }

A store that can have subscribers and emit values to them. It also
provides the current value upon subscription.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

node_modules/universal-stores/dist/index.d.ts:58

___

### StoreConfig

Ƭ **StoreConfig**<`T`\>: `Object`

Configurations for Store<T> and ReadonlyStore<T>.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `comparator?` | [`EqualityComparator`](README.md#equalitycomparator)<`T`\> | (optional, defaults to `(a, b) => a === b`) a function that's used to determine if the current value of the store value is different from the one being set and thus if the store needs to be updated and the subscribers notified. |
| `start?` | [`StartHandler`](README.md#starthandler)<`T`\> | (optional) a [StartHandler](README.md#starthandler) that will get called once there is at least one subscriber to this store. |

#### Defined in

node_modules/universal-stores/dist/index.d.ts:74

___

### Subscriber

Ƭ **Subscriber**<`T`\>: (`current`: `T`) => `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`current`): `void`

A generic subscriber. Used in [Store](README.md#store)

##### Parameters

| Name | Type |
| :------ | :------ |
| `current` | `T` |

##### Returns

`void`

#### Defined in

node_modules/universal-stores/dist/index.d.ts:12

___

### Unsubscribe

Ƭ **Unsubscribe**: () => `void`

#### Type declaration

▸ (): `void`

A function that's used to unsubscribe a subscriber from a store. Used in [Store](README.md#store)

##### Returns

`void`

#### Defined in

node_modules/universal-stores/dist/index.d.ts:14

___

### Update

Ƭ **Update**<`T`\>: (`updater`: (`current`: `T`) => `T`) => `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`updater`): `void`

A generic update function. Used in [Store](README.md#store)

##### Parameters

| Name | Type |
| :------ | :------ |
| `updater` | (`current`: `T`) => `T` |

##### Returns

`void`

#### Defined in

node_modules/universal-stores/dist/index.d.ts:22

___

### Updater

Ƭ **Updater**<`T`\>: (`current`: `T`) => `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`current`): `T`

A generic updater function. Used in [Store](README.md#store)

##### Parameters

| Name | Type |
| :------ | :------ |
| `current` | `T` |

##### Returns

`T`

#### Defined in

node_modules/universal-stores/dist/index.d.ts:20

## Variables

### FileStorageAdapters

• `Const` **FileStorageAdapters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `async` | <T\>(`path`: `PathLike`, `options`: { `observe`: ``true`` ; `serde`: [`AsyncSerde`](README.md#asyncserde)<`T`, `string` \| `ArrayBufferView` \| `Iterable`<`string` \| `ArrayBufferView`\> \| `AsyncIterable`<`string` \| `ArrayBufferView`\> \| `Stream`, `Buffer`\>  }) => [`ObservableAsyncItemStorage`](README.md#observableasyncitemstorage)<`T`\><T\>(`path`: `PathLike`, `options`: { `observe?`: ``false`` ; `serde`: [`AsyncSerde`](README.md#asyncserde)<`T`, `string` \| `ArrayBufferView` \| `Iterable`<`string` \| `ArrayBufferView`\> \| `AsyncIterable`<`string` \| `ArrayBufferView`\> \| `Stream`, `Buffer`\>  }) => [`AsyncItemStorage`](README.md#asyncitemstorage)<`T`\><T\>(`path`: `PathLike`, `options`: { `observe?`: `boolean` ; `serde`: [`AsyncSerde`](README.md#asyncserde)<`T`, `string` \| `ArrayBufferView` \| `Iterable`<`string` \| `ArrayBufferView`\> \| `AsyncIterable`<`string` \| `ArrayBufferView`\> \| `Stream`, `Buffer`\>  }) => [`AsyncItemStorage`](README.md#asyncitemstorage)<`T`\> \| [`ObservableAsyncItemStorage`](README.md#observableasyncitemstorage)<`T`\> |
| `jsonAsync` | <T\>(`path`: `PathLike`, `options`: { `observe`: ``true``  }) => [`ObservableAsyncItemStorage`](README.md#observableasyncitemstorage)<`T`\><T\>(`path`: `PathLike`, `options?`: { `observe?`: ``false``  }) => [`AsyncItemStorage`](README.md#asyncitemstorage)<`T`\><T\>(`path`: `PathLike`, `options?`: { `observe?`: `boolean`  }) => [`AsyncItemStorage`](README.md#asyncitemstorage)<`T`\> \| [`ObservableAsyncItemStorage`](README.md#observableasyncitemstorage)<`T`\> |
| `jsonSync` | <T\>(`path`: `PathLike`, `options`: { `observe`: ``true``  }) => [`ObservableItemStorage`](README.md#observableitemstorage)<`T`\><T\>(`path`: `PathLike`, `options?`: { `observe?`: ``false``  }) => [`ItemStorage`](README.md#itemstorage)<`T`\><T\>(`path`: `PathLike`, `options`: { `observe?`: `boolean`  }) => [`ItemStorage`](README.md#itemstorage)<`T`\> \| [`ObservableItemStorage`](README.md#observableitemstorage)<`T`\> |
| `sync` | <T\>(`path`: `PathLike`, `options`: { `observe`: ``true`` ; `serde`: [`Serde`](README.md#serde)<`T`, `string` \| `ArrayBufferView`, `Buffer`\>  }) => [`ObservableItemStorage`](README.md#observableitemstorage)<`T`\><T\>(`path`: `PathLike`, `options`: { `observe?`: ``false`` ; `serde`: [`Serde`](README.md#serde)<`T`, `string` \| `ArrayBufferView`, `Buffer`\>  }) => [`ItemStorage`](README.md#itemstorage)<`T`\><T\>(`path`: `PathLike`, `options`: { `observe?`: `boolean` ; `serde`: [`Serde`](README.md#serde)<`T`, `string` \| `ArrayBufferView`, `Buffer`\>  }) => [`ItemStorage`](README.md#itemstorage)<`T`\> \| [`ObservableItemStorage`](README.md#observableitemstorage)<`T`\> |
| `textAsync` | (`path`: `PathLike`, `options?`: { `observe?`: ``false``  }) => [`AsyncItemStorage`](README.md#asyncitemstorage)<`string`\>(`path`: `PathLike`, `options`: { `observe`: ``true``  }) => [`ObservableAsyncItemStorage`](README.md#observableasyncitemstorage)<`string`\>(`path`: `PathLike`, `options?`: { `observe?`: `boolean`  }) => [`AsyncItemStorage`](README.md#asyncitemstorage)<`string`\> \| [`ObservableAsyncItemStorage`](README.md#observableasyncitemstorage)<`string`\> |
| `textSync` | (`path`: `PathLike`, `options?`: { `observe?`: ``false``  }) => [`ItemStorage`](README.md#itemstorage)<`string`\>(`path`: `PathLike`, `options`: { `observe`: ``true``  }) => [`ObservableItemStorage`](README.md#observableitemstorage)<`string`\>(`path`: `PathLike`, `options?`: { `observe?`: `boolean`  }) => [`ItemStorage`](README.md#itemstorage)<`string`\> \| [`ObservableItemStorage`](README.md#observableitemstorage)<`string`\> |

#### Defined in

[src/lib/storage-adapters/file.ts:476](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/file.ts#L476)

___

### InMemoryStorageAdapters

• `Const` **InMemoryStorageAdapters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `async` | <T\>(`defaultValue?`: `T`) => [`AsyncItemStorage`](README.md#asyncitemstorage)<`T`\> |
| `sync` | <T\>(`defaultValue?`: `T`) => [`ItemStorage`](README.md#itemstorage)<`T`\> |

#### Defined in

[src/lib/storage-adapters/memory.ts:44](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/memory.ts#L44)

___

### RESTStorageAdapters

• `Const` **RESTStorageAdapters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `async` | <T, TBody\>(`resourceUrl`: `string`, `config`: [`RestAsyncStorageAdapterConfig`](README.md#restasyncstorageadapterconfig)<`T`, `TBody`\>) => [`AsyncItemStorage`](README.md#asyncitemstorage)<`T`\> |
| `jsonAsync` | <T\>(`resourceUrl`: `string`, `config?`: [`PartialRESTAsyncStorageAdapterConfig`](README.md#partialrestasyncstorageadapterconfig)) => [`AsyncItemStorage`](README.md#asyncitemstorage)<`T`\> |
| `textAsync` | (`resourceUrl`: `string`, `config?`: [`PartialRESTAsyncStorageAdapterConfig`](README.md#partialrestasyncstorageadapterconfig)) => [`AsyncItemStorage`](README.md#asyncitemstorage)<`string`\> |

#### Defined in

[src/lib/storage-adapters/rest.ts:155](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/rest.ts#L155)

___

### WebStorageAdapters

• `Const` **WebStorageAdapters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `local` | <T\>(`key`: `string`, `options`: { `observe?`: ``false`` ; `serde?`: [`Serde`](README.md#serde)<`T`, `string`, `string`\>  }) => [`ItemStorage`](README.md#itemstorage)<`T`\><T\>(`key`: `string`, `options?`: { `observe`: ``true`` ; `serde?`: [`Serde`](README.md#serde)<`T`, `string`, `string`\>  }) => [`ObservableItemStorage`](README.md#observableitemstorage)<`T`\><T\>(`key`: `string`, `options?`: { `observe?`: `boolean` ; `serde?`: [`Serde`](README.md#serde)<`T`, `string`, `string`\>  }) => [`ItemStorage`](README.md#itemstorage)<`T`\> \| [`ObservableItemStorage`](README.md#observableitemstorage)<`T`\> |
| `session` | <T\>(`key`: `string`, `options`: { `observe?`: ``false`` ; `serde?`: [`Serde`](README.md#serde)<`T`, `string`, `string`\>  }) => [`ItemStorage`](README.md#itemstorage)<`T`\><T\>(`key`: `string`, `options?`: { `observe`: ``true`` ; `serde?`: [`Serde`](README.md#serde)<`T`, `string`, `string`\>  }) => [`ObservableItemStorage`](README.md#observableitemstorage)<`T`\><T\>(`key`: `string`, `options?`: { `observe?`: `boolean` ; `serde?`: [`Serde`](README.md#serde)<`T`, `string`, `string`\>  }) => [`ItemStorage`](README.md#itemstorage)<`T`\> \| [`ObservableItemStorage`](README.md#observableitemstorage)<`T`\> |

#### Defined in

[src/lib/storage-adapters/web-storage.ts:220](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/web-storage.ts#L220)

## Functions

### makeAsyncPersistentStore

▸ **makeAsyncPersistentStore**<`T`\>(`defaultValue`, `config`): [`AsyncPersistentStore`](README.md#asyncpersistentstore)<`T`\>

Create an AsyncPersistentStore. This store will be initialized with `defaultValue`.

Note: to fetch the most up-to-date content of the store, you should manually call `.fetch()` after the
store initialization. This is done to ensure that you can create your stores synchronously and fetch
the data lazily.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `defaultValue` | `T` | the value the store will contain upon initialization. |
| `config` | [`AsyncPersistentStoreConfig`](README.md#asyncpersistentstoreconfig)<`T`\> | the configuration object. |

#### Returns

[`AsyncPersistentStore`](README.md#asyncpersistentstore)<`T`\>

#### Defined in

[src/lib/async-persistent.ts:95](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/async-persistent.ts#L95)

___

### makeDerivedStore

▸ **makeDerivedStore**<`TIn`, `TOut`\>(`readonlyStore`, `map`, `config?`): [`ReadonlyStore`](README.md#readonlystore)<`TOut`\>

Create a derived store.

Example usage:
```ts
const source$ = makeStore(10);
const derived$ = makeDerivedStore(source$, (v) => v * 2);
source$.subscribe((v) => console.log(v)); // prints 10
derived$.subscribe((v) => console.log(v)); // prints 20
source$.set(16); // triggers both console.logs, printing 16 and 32
```

#### Type parameters

| Name |
| :------ |
| `TIn` |
| `TOut` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readonlyStore` | [`ReadonlyStore`](README.md#readonlystore)<`TIn`\> | a store or readonly store. |
| `map` | (`value`: `TIn`) => `TOut` | a function that takes the current value of the source store and maps it to another value. |
| `config?` | [`DerivedStoreConfig`](README.md#derivedstoreconfig)<`TOut`\> | a [DerivedStoreConfig](README.md#derivedstoreconfig) which contains configuration information such as a value comparator to avoid needless notifications to subscribers. |

#### Returns

[`ReadonlyStore`](README.md#readonlystore)<`TOut`\>

#### Defined in

node_modules/universal-stores/dist/composition.d.ts:37

▸ **makeDerivedStore**<`TIn`, `TOut`\>(`readonlyStores`, `map`, `config?`): [`ReadonlyStore`](README.md#readonlystore)<`TOut`\>

Create a derived store from multiple sources.

Example usage:
```ts
const source1$ = makeStore(10);
const source2$ = makeStore(-10);
const derived$ = makeDerivedStore([source1$, source2$], ([v1, v2]) => v1 + v2);
source1$.subscribe((v) => console.log(v)); // prints 10
source2$.subscribe((v) => console.log(v)); // prints -10
derived$.subscribe((v) => console.log(v)); // prints 0
source1$.set(11); // prints 11 (first console.log) and 1 (third console.log)
source2$.set(9); // prints 9 (second console.log) and 20 (third console.log)
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TIn` | extends `unknown`[] \| [`unknown`, ...unknown[]] |
| `TOut` | `TOut` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readonlyStores` | { [K in string \| number \| symbol]: ReadonlyStore<TIn[K]\> } | an array of stores or readonly stores. |
| `map` | (`value`: { [K in string \| number \| symbol]: TIn[K] }) => `TOut` | a function that takes the current value of all the source stores and maps it to another value. |
| `config?` | [`DerivedStoreConfig`](README.md#derivedstoreconfig)<`TOut`\> | a [DerivedStoreConfig](README.md#derivedstoreconfig) which contains configuration information such as a value comparator to avoid needless notifications to subscribers. |

#### Returns

[`ReadonlyStore`](README.md#readonlystore)<`TOut`\>

#### Defined in

node_modules/universal-stores/dist/composition.d.ts:56

▸ **makeDerivedStore**<`TIn`, `TOut`\>(`readonlyStores`, `map`, `config?`): [`ReadonlyStore`](README.md#readonlystore)<`TOut`\>

Create a derived store from multiple sources.

Example usage:
```ts
const source1$ = makeStore(10);
const source2$ = makeStore(-10);
const derived$ = makeDerivedStore({v1: source1$, v2: source2$}, ({v1, v2}) => v1 + v2);
source1$.subscribe((v) => console.log(v)); // prints 10
source2$.subscribe((v) => console.log(v)); // prints -10
derived$.subscribe((v) => console.log(v)); // prints 0
source1$.set(11); // prints 11 (first console.log) and 1 (third console.log)
source2$.set(9); // prints 9 (second console.log) and 20 (third console.log)
```

#### Type parameters

| Name |
| :------ |
| `TIn` |
| `TOut` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readonlyStores` | { [K in string \| number \| symbol]: ReadonlyStore<TIn[K]\> } | an array of stores or readonly stores. |
| `map` | (`value`: { [K in string \| number \| symbol]: TIn[K] }) => `TOut` | a function that takes the current value of all the source stores and maps it to another value. |
| `config?` | [`DerivedStoreConfig`](README.md#derivedstoreconfig)<`TOut`\> | a [DerivedStoreConfig](README.md#derivedstoreconfig) which contains configuration information such as a value comparator to avoid needless notifications to subscribers. |

#### Returns

[`ReadonlyStore`](README.md#readonlystore)<`TOut`\>

#### Defined in

node_modules/universal-stores/dist/composition.d.ts:79

___

### makeJSONSerde

▸ **makeJSONSerde**<`T`\>(): [`Serde`](README.md#serde)<`T`, `string`\>

Create a JSON serializer/deserializer that consists of JSON.parse/stringify.
The deserialization procedure throws a [JSONDeserializationError](classes/JSONDeserializationError.md) when
JSON.stringify returns `undefined` instead of a string.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

[`Serde`](README.md#serde)<`T`, `string`\>

#### Defined in

[src/lib/storage-adapters/serde/json-serde.ts:18](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/serde/json-serde.ts#L18)

___

### makePersistentStore

▸ **makePersistentStore**<`T`\>(`defaultValue`, `config`): [`PersistentStore`](README.md#persistentstore)<`T`\>

Create a Persistent Store. This store will be initialized with `defaultValue`

Note: to fetch the most up-to-date content of the store, you should manually call `.fetch()` after the
store initialization. This is done to ensure that you can create your stores synchronously and fetch
the data lazily without unnecessarily blocking the main thread.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `defaultValue` | `T` | the value the store will contain upon initialization. |
| `config` | [`PersistentStoreConfig`](README.md#persistentstoreconfig)<`T`\> | the configuration object. |

#### Returns

[`PersistentStore`](README.md#persistentstore)<`T`\>

#### Defined in

[src/lib/persistent.ts:54](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/persistent.ts#L54)

___

### makeReadonlyStore

▸ **makeReadonlyStore**<`T`\>(`initialValue`, `start?`): [`ReadonlyStore`](README.md#readonlystore)<`T`\>

Make a store of type T.

Example usage:
```ts
let value = 0;
const store$ = makeReadonlyStore(value, (set) => {
	value++;
	set(value);
});
console.log(store$.content()); // 1
store$.subscribe((v) => console.log(v)); // immediately prints 2
console.log(store$.content()); // 2
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `initialValue` | `undefined` \| `T` | the initial value of the store. |
| `start?` | [`StartHandler`](README.md#starthandler)<`T`\> | a [StartHandler](README.md#starthandler) that will get called once there is at least one subscriber to this store. |

#### Returns

[`ReadonlyStore`](README.md#readonlystore)<`T`\>

a ReadonlyStore

#### Defined in

node_modules/universal-stores/dist/index.d.ts:146

▸ **makeReadonlyStore**<`T`\>(`initialValue`, `config?`): [`ReadonlyStore`](README.md#readonlystore)<`T`\>

Make a store of type T.

Example usage:
```ts
const store$ = makeReadonlyStore({prop: 'some value'}, {
	comparator: (a, b) => a.prop === b.prop,
	start: (set) => {
		// ...
	},
});
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `initialValue` | `undefined` \| `T` | the initial value of the store. |
| `config?` | [`StoreConfig`](README.md#storeconfig)<`T`\> | a [StoreConfig](README.md#storeconfig) which contains configuration information such as a value comparator to avoid needless notifications to subscribers and a [StartHandler](README.md#starthandler). |

#### Returns

[`ReadonlyStore`](README.md#readonlystore)<`T`\>

a ReadonlyStore

#### Defined in

node_modules/universal-stores/dist/index.d.ts:163

▸ **makeReadonlyStore**<`T`\>(`initialValue`, `startOrConfig?`): [`ReadonlyStore`](README.md#readonlystore)<`T`\>

Make a store of type T.

Example usage:
```ts
let value = 0;
const store$ = makeReadonlyStore(value, (set) => {
	value++;
	set(value);
});
console.log(store$.content()); // 1
store$.subscribe((v) => console.log(v)); // immediately prints 2
console.log(store$.content()); // 2
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `initialValue` | `undefined` \| `T` | the initial value of the store. |
| `startOrConfig?` | [`StartHandler`](README.md#starthandler)<`T`\> \| [`StoreConfig`](README.md#storeconfig)<`T`\> | a [StartHandler](README.md#starthandler) or a [StoreConfig](README.md#storeconfig) which contains configuration information such as a value comparator to avoid needless notifications to subscribers and a [StartHandler](README.md#starthandler). |

#### Returns

[`ReadonlyStore`](README.md#readonlystore)<`T`\>

a ReadonlyStore

#### Defined in

node_modules/universal-stores/dist/index.d.ts:182

___

### makeStore

▸ **makeStore**<`T`\>(`initialValue`, `start?`): [`Store`](README.md#store)<`T`\>

Make a store of type T.

Example usage:
```ts
const store$ = makeStore(0);
console.log(store$.content()); // 0
store$.subscribe((v) => console.log(v));
store$.set(10); // will trigger the above console log, printing 10
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `initialValue` | `undefined` \| `T` | the initial value of the store. |
| `start?` | [`StartHandler`](README.md#starthandler)<`T`\> | a [StartHandler](README.md#starthandler) that will get called once there is at least one subscriber to this store. |

#### Returns

[`Store`](README.md#store)<`T`\>

a Store

#### Defined in

node_modules/universal-stores/dist/index.d.ts:97

▸ **makeStore**<`T`\>(`initialValue`, `config?`): [`Store`](README.md#store)<`T`\>

Make a store of type T.

Example usage:
```ts
const store$ = makeStore(0);
console.log(store$.content()); // 0
store$.subscribe((v) => console.log(v));
store$.set(10); // will trigger the above console log, printing 10
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `initialValue` | `undefined` \| `T` | the initial value of the store. |
| `config?` | [`StoreConfig`](README.md#storeconfig)<`T`\> | a [StoreConfig](README.md#storeconfig) which contains configuration information such as a value comparator to avoid needless notifications to subscribers and a [StartHandler](README.md#starthandler). |

#### Returns

[`Store`](README.md#store)<`T`\>

a Store

#### Defined in

node_modules/universal-stores/dist/index.d.ts:112

▸ **makeStore**<`T`\>(`initialValue`, `startOrConfig?`): [`Store`](README.md#store)<`T`\>

Make a store of type T.

Example usage:
```ts
const store$ = makeStore(0);
console.log(store$.content()); // 0
store$.subscribe((v) => console.log(v));
store$.set(10); // will trigger the above console log, printing 10
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `initialValue` | `undefined` \| `T` | the initial value of the store. |
| `startOrConfig?` | [`StartHandler`](README.md#starthandler)<`T`\> \| [`StoreConfig`](README.md#storeconfig)<`T`\> | a [StartHandler](README.md#starthandler) or a [StoreConfig](README.md#storeconfig) which contains configuration information such as a value comparator to avoid needless notifications to subscribers and a [StartHandler](README.md#starthandler). |

#### Returns

[`Store`](README.md#store)<`T`\>

a Store

#### Defined in

node_modules/universal-stores/dist/index.d.ts:127
