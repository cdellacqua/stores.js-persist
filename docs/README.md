@universal-stores/persist

# @universal-stores/persist

## Table of contents

### Namespaces

- [FileStorageAdapters](modules/FileStorageAdapters.md)
- [InMemoryStorageAdapters](modules/InMemoryStorageAdapters.md)
- [RESTStorageAdapters](modules/RESTStorageAdapters.md)
- [WebStorageAdapters](modules/WebStorageAdapters.md)

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
- [ItemStorage](README.md#itemstorage)
- [ObservableAsyncItemStorage](README.md#observableasyncitemstorage)
- [ObservableItemStorage](README.md#observableitemstorage)
- [PersistentStore](README.md#persistentstore)
- [PersistentStoreConfig](README.md#persistentstoreconfig)
- [Serde](README.md#serde)

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

Ƭ **AsyncPersistentStore**<`T`\>: `Omit`<`Store`<`T`\>, ``"set"`` \| ``"update"``\> & { `fetch`: (`options?`: { `signal?`: `AbortSignal`  }) => `Promise`<`T` \| `undefined`\> ; `persist`: (`options?`: { `signal?`: `AbortSignal`  }) => `Promise`<`void`\> ; `set`: [`AsyncSetter`](README.md#asyncsetter)<`T`\> ; `setCache`: `Setter`<`T`\> ; `state$`: `ReadonlyStore`<[`AsyncPersistentStoreState`](README.md#asyncpersistentstorestate)\> ; `storage`: [`AsyncItemStorage`](README.md#asyncitemstorage)<`T`\> ; `update`: [`AsyncUpdate`](README.md#asyncupdate)<`T`\> ; `updateCache`: `Update`<`T`\>  }

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

Ƭ **AsyncUpdate**<`T`\>: (`updater`: `Updater`<`T`\>, `options?`: { `signal?`: `AbortSignal`  }) => `Promise`<`void`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`updater`, `options?`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `updater` | `Updater`<`T`\> |
| `options?` | `Object` |
| `options.signal?` | `AbortSignal` |

##### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/async-persistent.ts:22](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/async-persistent.ts#L22)

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

### PersistentStore

Ƭ **PersistentStore**<`T`\>: `Store`<`T`\> & { `fetch`: () => `T` \| `undefined` ; `persist`: () => `void` ; `setCache`: `Setter`<`T`\> ; `storage`: [`ItemStorage`](README.md#itemstorage)<`T`\> ; `updateCache`: `Update`<`T`\>  }

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
