[**@universal-stores/persist**](../README.md)

***

[@universal-stores/persist](../README.md) / AsyncPersistentStore

# Type Alias: AsyncPersistentStore\<T\>

> **AsyncPersistentStore**\<`T`\> = `Omit`\<[`Store`](Store.md)\<`T`\>, `"set"` \| `"update"`\> & `object`

Defined in: [src/lib/async-persistent.ts:30](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/async-persistent.ts#L30)

A Persistent store that supports asynchronous operations.

## Type Declaration

### fetch

> **fetch**: (`options?`) => `Promise`\<`T` \| `undefined`\>

Manually fetch the content of the store by querying the storage.

#### Parameters

##### options?

###### signal?

`AbortSignal`

#### Returns

`Promise`\<`T` \| `undefined`\>

### persist

> **persist**: (`options?`) => `Promise`\<`void`\>

Manually persist the current content of the store to the storage.

#### Parameters

##### options?

###### signal?

`AbortSignal`

#### Returns

`Promise`\<`void`\>

### set

> **set**: [`AsyncSetter`](AsyncSetter.md)\<`T`\>

Asynchronously set the content of the store and persist it to the async storage.

#### Param

the new value of this store.

### setCache

> **setCache**: [`Setter`](Setter.md)\<`T`\>

Set the content of the store without persisting it to the storage.

#### Param

the new value of this store.

### state$

> **state$**: [`ReadonlyStore`](ReadonlyStore.md)\<[`AsyncPersistentStoreState`](AsyncPersistentStoreState.md)\>

A sub-store containing the current state of the main store ([AsyncPersistentStoreState](AsyncPersistentStoreState.md)).

### storage

> **storage**: [`AsyncItemStorage`](AsyncItemStorage.md)\<`T`\>

The underlying storage handler for this store.

### update

> **update**: [`AsyncUpdate`](AsyncUpdate.md)\<`T`\>

Asynchronously set the new value of the store through an updater function and persist it to the async storage.

#### Param

the update function that will receive the current value and return the new one.

### updateCache

> **updateCache**: [`Update`](Update.md)\<`T`\>

Set the content of the store through an update function without persisting it to the storage.

#### Param

the update function that will receive the current value and return the new one.

## Type Parameters

### T

`T`
