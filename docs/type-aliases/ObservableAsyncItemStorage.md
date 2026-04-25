[**@universal-stores/persist**](../README.md)

***

[@universal-stores/persist](../README.md) / ObservableAsyncItemStorage

# Type Alias: ObservableAsyncItemStorage\<T\>

> **ObservableAsyncItemStorage**\<`T`\> = [`AsyncItemStorage`](AsyncItemStorage.md)\<`T`\> & `object`

Defined in: [src/lib/storage-adapters/shared.ts:92](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/shared.ts#L92)

An asynchronous single item storage that provides a set of common methods and a `change$` signal to listen
for external modifications to the content of the storage.

Note: when disposing of this type of storage, make sure to call `.unobserve()`, so that
all the associated resource may be properly freed (e.g. a file system watcher, an event listener on the Window, etc.).

## Type Declaration

### change$

> **change$**: [`ReadonlySignal`](ReadonlySignal.md)\<`T`\>

### unobserve()

> **unobserve**(): `void`

#### Returns

`void`

## Type Parameters

### T

`T`
