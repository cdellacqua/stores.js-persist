[**@universal-stores/persist**](../README.md)

***

[@universal-stores/persist](../README.md) / PersistentStoreConfig

# Type Alias: PersistentStoreConfig\<T\>

> **PersistentStoreConfig**\<`T`\> = `object`

Defined in: [src/lib/persistent.ts:29](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/persistent.ts#L29)

Configuration object used to initialize the Persistent Store.

## Type Parameters

### T

`T`

## Properties

### start?

> `optional` **start?**: (`set`) => `void` \| (() => `void`)

Defined in: [src/lib/persistent.ts:34](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/persistent.ts#L34)

(optional) A start function that will be called once the store has at least one subscriber and optionally returns a stop function that will be called
once the store has no remaining subscribers.

#### Parameters

##### set

(`value`) => `void`

#### Returns

`void` \| (() => `void`)

***

### storage

> **storage**: [`ItemStorage`](ItemStorage.md)\<`T`\> \| [`ObservableItemStorage`](ObservableItemStorage.md)\<`T`\>

Defined in: [src/lib/persistent.ts:36](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/persistent.ts#L36)

The underlying storage handler for this store.
