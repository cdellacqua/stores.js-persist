[**@universal-stores/persist**](../README.md)

***

[@universal-stores/persist](../README.md) / AsyncItemStorage

# Type Alias: AsyncItemStorage\<T\>

> **AsyncItemStorage**\<`T`\> = `object`

Defined in: [src/lib/storage-adapters/shared.ts:70](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/shared.ts#L70)

An asynchronous single item storage that provides a set of common methods.

## Type Parameters

### T

`T`

## Methods

### clear()

> **clear**(`options?`): `Promise`\<`void`\>

Defined in: [src/lib/storage-adapters/shared.ts:82](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/shared.ts#L82)

Erase the storage content.

#### Parameters

##### options?

###### signal?

`AbortSignal`

#### Returns

`Promise`\<`void`\>

***

### get()

> **get**(`options?`): `Promise`\<`T` \| `undefined`\>

Defined in: [src/lib/storage-adapters/shared.ts:74](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/shared.ts#L74)

Return the contained value or undefined if the store is empty.

#### Parameters

##### options?

###### signal?

`AbortSignal`

#### Returns

`Promise`\<`T` \| `undefined`\>

***

### set()

> **set**(`value`, `options?`): `Promise`\<`void`\>

Defined in: [src/lib/storage-adapters/shared.ts:78](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/shared.ts#L78)

Save the passed value.

#### Parameters

##### value

`T`

##### options?

###### signal?

`AbortSignal`

#### Returns

`Promise`\<`void`\>
