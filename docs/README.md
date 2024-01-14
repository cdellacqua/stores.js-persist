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
- [HttpVerb](README.md#httpverb)
- [HttpVerbWithBody](README.md#httpverbwithbody)
- [HttpVerbsWithoutBody](README.md#httpverbswithoutbody)
- [ItemStorage](README.md#itemstorage)
- [ObservableAsyncItemStorage](README.md#observableasyncitemstorage)
- [ObservableItemStorage](README.md#observableitemstorage)
- [PartialRESTAsyncStorageAdapterConfig](README.md#partialrestasyncstorageadapterconfig)
- [PersistentStore](README.md#persistentstore)
- [PersistentStoreConfig](README.md#persistentstoreconfig)
- [ReadonlySignal](README.md#readonlysignal)
- [ReadonlyStore](README.md#readonlystore)
- [RestAsyncStorageAdapterConfig](README.md#restasyncstorageadapterconfig)
- [Serde](README.md#serde)
- [Setter](README.md#setter)
- [Store](README.md#store)
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
- [makeJSONSerde](README.md#makejsonserde)
- [makePersistentStore](README.md#makepersistentstore)

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

Ƭ **ObservableAsyncItemStorage**<`T`\>: [`AsyncItemStorage`](README.md#asyncitemstorage)<`T`\> & { `change$`: [`ReadonlySignal`](README.md#readonlysignal)<`T`\> ; `unobserve`: () => `void`  }

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

Ƭ **ObservableItemStorage**<`T`\>: [`ItemStorage`](README.md#itemstorage)<`T`\> & { `change$`: [`ReadonlySignal`](README.md#readonlysignal)<`T`\> ; `unobserve`: () => `void`  }

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

### ReadonlySignal

Ƭ **ReadonlySignal**<`T`\>: `Object`

A signal that can have subscribers and emit values to them.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `nOfSubscriptions` | () => `number` |
| `subscribe` | (`subscriber`: [`Subscriber`](README.md#subscriber)<`T`\>) => [`Unsubscribe`](README.md#unsubscribe) |
| `subscribeOnce` | (`subscriber`: [`Subscriber`](README.md#subscriber)<`T`\>) => [`Unsubscribe`](README.md#unsubscribe) |

#### Defined in

node_modules/@cdellacqua/signals/dist/index.d.ts:6

___

### ReadonlyStore

Ƭ **ReadonlyStore**<`T`\>: `Object`

A store that can have subscribers and emit values to them. It also
provides the current value upon subscription. It's readonly in the
sense that it doesn't provide direct set/update methods, unlike [Store](README.md#store),
therefore its value can only be changed by a StartHandler (see also makeReadonlyStore).

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

node_modules/universal-stores/dist/index.d.ts:33

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

node_modules/universal-stores/dist/index.d.ts:14

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

node_modules/universal-stores/dist/index.d.ts:56

___

### Subscriber

Ƭ **Subscriber**<`T`\>: (`current`: `T`) => `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`current`): `void`

A generic subscriber that takes a value emitted by a signal as its only parameter.

##### Parameters

| Name | Type |
| :------ | :------ |
| `current` | `T` |

##### Returns

`void`

#### Defined in

node_modules/@cdellacqua/signals/dist/index.d.ts:2

___

### Unsubscribe

Ƭ **Unsubscribe**: () => `void`

#### Type declaration

▸ (): `void`

A function that's used to unsubscribe a subscriber from a signal.

##### Returns

`void`

#### Defined in

node_modules/@cdellacqua/signals/dist/index.d.ts:4

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

node_modules/universal-stores/dist/index.d.ts:20

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

node_modules/universal-stores/dist/index.d.ts:18

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

[src/lib/storage-adapters/file.ts:479](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/file.ts#L479)

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
