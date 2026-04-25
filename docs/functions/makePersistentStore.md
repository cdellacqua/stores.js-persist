[**@universal-stores/persist**](../README.md)

***

[@universal-stores/persist](../README.md) / makePersistentStore

# Function: makePersistentStore()

> **makePersistentStore**\<`T`\>(`defaultValue`, `config`): [`PersistentStore`](../type-aliases/PersistentStore.md)\<`T`\>

Defined in: [src/lib/persistent.ts:54](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/persistent.ts#L54)

Create a Persistent Store. This store will be initialized with `defaultValue`

Note: to fetch the most up-to-date content of the store, you should manually call `.fetch()` after the
store initialization. This is done to ensure that you can create your stores synchronously and fetch
the data lazily without unnecessarily blocking the main thread.

## Type Parameters

### T

`T`

## Parameters

### defaultValue

`T`

the value the store will contain upon initialization.

### config

[`PersistentStoreConfig`](../type-aliases/PersistentStoreConfig.md)\<`T`\>

the configuration object.

## Returns

[`PersistentStore`](../type-aliases/PersistentStore.md)\<`T`\>
