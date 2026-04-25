[**@universal-stores/persist**](../README.md)

***

[@universal-stores/persist](../README.md) / ItemStorage

# Type Alias: ItemStorage\<T\>

> **ItemStorage**\<`T`\> = `object`

Defined in: [src/lib/storage-adapters/shared.ts:40](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/shared.ts#L40)

A single item storage that provides a set of common methods.

## Type Parameters

### T

`T`

## Methods

### clear()

> **clear**(): `void`

Defined in: [src/lib/storage-adapters/shared.ts:52](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/shared.ts#L52)

Erase the storage content.

#### Returns

`void`

***

### get()

> **get**(): `T` \| `undefined`

Defined in: [src/lib/storage-adapters/shared.ts:44](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/shared.ts#L44)

Return the contained value or undefined if the storage is empty.

#### Returns

`T` \| `undefined`

***

### set()

> **set**(`value`): `void`

Defined in: [src/lib/storage-adapters/shared.ts:48](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/shared.ts#L48)

Save the passed value.

#### Parameters

##### value

`T`

#### Returns

`void`
