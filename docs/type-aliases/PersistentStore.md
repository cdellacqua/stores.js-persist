[**@universal-stores/persist**](../README.md)

***

[@universal-stores/persist](../README.md) / PersistentStore

# Type Alias: PersistentStore\<T\>

> **PersistentStore**\<`T`\> = [`Store`](Store.md)\<`T`\> & `object`

Defined in: [src/lib/persistent.ts:7](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/persistent.ts#L7)

A Persistent store that supports synchronous operations.

## Type Declaration

### fetch

> **fetch**: () => `T` \| `undefined`

Manually fetch the content of the store by querying the storage.

#### Returns

`T` \| `undefined`

### persist

> **persist**: () => `void`

Manually persist the current content of the store to the storage.

#### Returns

`void`

### setCache

> **setCache**: [`Setter`](Setter.md)\<`T`\>

Set the content of the store without persisting it to the storage.

#### Param

the new value of this store.

### storage

> **storage**: [`ItemStorage`](ItemStorage.md)\<`T`\>

The underlying storage handler for this store.

### updateCache

> **updateCache**: [`Update`](Update.md)\<`T`\>

Set the content of the store through an update function without persisting it to the storage.

#### Param

the update function that will receive the current value and return the new one.

## Type Parameters

### T

`T`
