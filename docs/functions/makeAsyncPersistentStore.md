[**@universal-stores/persist**](../README.md)

***

[@universal-stores/persist](../README.md) / makeAsyncPersistentStore

# Function: makeAsyncPersistentStore()

> **makeAsyncPersistentStore**\<`T`\>(`defaultValue`, `config`): [`AsyncPersistentStore`](../type-aliases/AsyncPersistentStore.md)\<`T`\>

Defined in: [src/lib/async-persistent.ts:95](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/async-persistent.ts#L95)

Create an AsyncPersistentStore. This store will be initialized with `defaultValue`.

Note: to fetch the most up-to-date content of the store, you should manually call `.fetch()` after the
store initialization. This is done to ensure that you can create your stores synchronously and fetch
the data lazily.

## Type Parameters

### T

`T`

## Parameters

### defaultValue

`T`

the value the store will contain upon initialization.

### config

[`AsyncPersistentStoreConfig`](../type-aliases/AsyncPersistentStoreConfig.md)\<`T`\>

the configuration object.

## Returns

[`AsyncPersistentStore`](../type-aliases/AsyncPersistentStore.md)\<`T`\>
