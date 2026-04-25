[**@universal-stores/persist**](../README.md)

***

[@universal-stores/persist](../README.md) / AsyncPersistentStoreConfig

# Type Alias: AsyncPersistentStoreConfig\<T\>

> **AsyncPersistentStoreConfig**\<`T`\> = `object`

Defined in: [src/lib/async-persistent.ts:68](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/async-persistent.ts#L68)

Configuration object used to initialize the Persistent Store.

## Type Parameters

### T

`T`

## Properties

### maxPendingOperations?

> `optional` **maxPendingOperations?**: `number`

Defined in: [src/lib/async-persistent.ts:79](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/async-persistent.ts#L79)

(optional, defaults to 100) The maximum number of async operations that can be enqueued before starting to reject.

***

### start?

> `optional` **start?**: [`AsyncPersistentStoreStartHandler`](AsyncPersistentStoreStartHandler.md)\<`T`\>

Defined in: [src/lib/async-persistent.ts:75](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/async-persistent.ts#L75)

(optional) A start function that will be called once the store has at least one subscriber and optionally returns a stop function that will be called
once the store has no remaining subscribers.

***

### storage

> **storage**: [`AsyncItemStorage`](AsyncItemStorage.md)\<`T`\> \| [`ObservableAsyncItemStorage`](ObservableAsyncItemStorage.md)\<`T`\>

Defined in: [src/lib/async-persistent.ts:70](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/async-persistent.ts#L70)

A storage.
