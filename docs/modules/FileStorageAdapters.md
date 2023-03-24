[@universal-stores/persist](../README.md) / FileStorageAdapters

# Namespace: FileStorageAdapters

## Table of contents

### Functions

- [async](FileStorageAdapters.md#async)
- [jsonAsync](FileStorageAdapters.md#jsonasync)
- [jsonSync](FileStorageAdapters.md#jsonsync)
- [sync](FileStorageAdapters.md#sync)
- [textAsync](FileStorageAdapters.md#textasync)
- [textSync](FileStorageAdapters.md#textsync)

## Functions

### async

▸ **async**<`T`\>(`path`, `options`): [`ObservableAsyncItemStorage`](../README.md#observableasyncitemstorage)<`T`\>

Create an asynchronous storage adapter based on a file.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `PathLike` | The target file path. |
| `options` | `Object` | A serializer/deserializer and whether to watch the file for external changes. |
| `options.observe` | ``true`` | - |
| `options.serde` | [`AsyncSerde`](../README.md#asyncserde)<`T`, `string` \| `ArrayBufferView` \| `Iterable`<`string` \| `ArrayBufferView`\> \| `AsyncIterable`<`string` \| `ArrayBufferView`\> \| `Stream`, `Buffer`\> | - |

#### Returns

[`ObservableAsyncItemStorage`](../README.md#observableasyncitemstorage)<`T`\>

#### Defined in

[src/lib/storage-adapters/file.ts:126](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/file.ts#L126)

▸ **async**<`T`\>(`path`, `options`): [`AsyncItemStorage`](../README.md#asyncitemstorage)<`T`\>

Create an asynchronous storage adapter based on a file.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `PathLike` | The target file path. |
| `options` | `Object` | A serializer/deserializer and whether to watch the file for external changes. |
| `options.observe?` | ``false`` | - |
| `options.serde` | [`AsyncSerde`](../README.md#asyncserde)<`T`, `string` \| `ArrayBufferView` \| `Iterable`<`string` \| `ArrayBufferView`\> \| `AsyncIterable`<`string` \| `ArrayBufferView`\> \| `Stream`, `Buffer`\> | - |

#### Returns

[`AsyncItemStorage`](../README.md#asyncitemstorage)<`T`\>

#### Defined in

[src/lib/storage-adapters/file.ts:148](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/file.ts#L148)

▸ **async**<`T`\>(`path`, `options`): [`AsyncItemStorage`](../README.md#asyncitemstorage)<`T`\> \| [`ObservableAsyncItemStorage`](../README.md#observableasyncitemstorage)<`T`\>

Create an asynchronous storage adapter based on a file.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `PathLike` | The target file path. |
| `options` | `Object` | A serializer/deserializer and whether to watch the file for external changes. |
| `options.observe?` | `boolean` | - |
| `options.serde` | [`AsyncSerde`](../README.md#asyncserde)<`T`, `string` \| `ArrayBufferView` \| `Iterable`<`string` \| `ArrayBufferView`\> \| `AsyncIterable`<`string` \| `ArrayBufferView`\> \| `Stream`, `Buffer`\> | - |

#### Returns

[`AsyncItemStorage`](../README.md#asyncitemstorage)<`T`\> \| [`ObservableAsyncItemStorage`](../README.md#observableasyncitemstorage)<`T`\>

#### Defined in

[src/lib/storage-adapters/file.ts:170](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/file.ts#L170)

___

### jsonAsync

▸ **jsonAsync**<`T`\>(`path`, `options`): [`ObservableAsyncItemStorage`](../README.md#observableasyncitemstorage)<`T`\>

Create an asynchronous storage adapter based on a file with a pre-configured json serializer/deserializer.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `PathLike` | The target file path. |
| `options` | `Object` | Whether to watch the file for external changes. |
| `options.observe` | ``true`` | - |

#### Returns

[`ObservableAsyncItemStorage`](../README.md#observableasyncitemstorage)<`T`\>

#### Defined in

[src/lib/storage-adapters/file.ts:392](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/file.ts#L392)

▸ **jsonAsync**<`T`\>(`path`, `options?`): [`AsyncItemStorage`](../README.md#asyncitemstorage)<`T`\>

Create an asynchronous storage adapter based on a file with a pre-configured json serializer/deserializer.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `PathLike` | The target file path. |
| `options?` | `Object` | Whether to watch the file for external changes. |
| `options.observe?` | ``false`` | - |

#### Returns

[`AsyncItemStorage`](../README.md#asyncitemstorage)<`T`\>

#### Defined in

[src/lib/storage-adapters/file.ts:402](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/file.ts#L402)

▸ **jsonAsync**<`T`\>(`path`, `options?`): [`AsyncItemStorage`](../README.md#asyncitemstorage)<`T`\> \| [`ObservableAsyncItemStorage`](../README.md#observableasyncitemstorage)<`T`\>

Create an asynchronous storage adapter based on a file with a pre-configured json serializer/deserializer.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `PathLike` | The target file path. |
| `options?` | `Object` | Whether to watch the file for external changes. |
| `options.observe?` | `boolean` | - |

#### Returns

[`AsyncItemStorage`](../README.md#asyncitemstorage)<`T`\> \| [`ObservableAsyncItemStorage`](../README.md#observableasyncitemstorage)<`T`\>

#### Defined in

[src/lib/storage-adapters/file.ts:412](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/file.ts#L412)

___

### jsonSync

▸ **jsonSync**<`T`\>(`path`, `options`): [`ObservableItemStorage`](../README.md#observableitemstorage)<`T`\>

Create a synchronous storage adapter based on a file with a pre-configured json serializer/deserializer.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `PathLike` | The target file path. |
| `options` | `Object` | Whether to watch the file for external changes. |
| `options.observe` | ``true`` | - |

#### Returns

[`ObservableItemStorage`](../README.md#observableitemstorage)<`T`\>

#### Defined in

[src/lib/storage-adapters/file.ts:299](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/file.ts#L299)

▸ **jsonSync**<`T`\>(`path`, `options?`): [`ItemStorage`](../README.md#itemstorage)<`T`\>

Create a synchronous storage adapter based on a file with a pre-configured json serializer/deserializer.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `PathLike` | The target file path. |
| `options?` | `Object` | Whether to watch the file for external changes. |
| `options.observe?` | ``false`` | - |

#### Returns

[`ItemStorage`](../README.md#itemstorage)<`T`\>

#### Defined in

[src/lib/storage-adapters/file.ts:311](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/file.ts#L311)

▸ **jsonSync**<`T`\>(`path`, `options`): [`ItemStorage`](../README.md#itemstorage)<`T`\> \| [`ObservableItemStorage`](../README.md#observableitemstorage)<`T`\>

Create a synchronous storage adapter based on a file with a pre-configured json serializer/deserializer.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `PathLike` | The target file path. |
| `options` | `Object` | Whether to watch the file for external changes. |
| `options.observe?` | `boolean` | - |

#### Returns

[`ItemStorage`](../README.md#itemstorage)<`T`\> \| [`ObservableItemStorage`](../README.md#observableitemstorage)<`T`\>

#### Defined in

[src/lib/storage-adapters/file.ts:323](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/file.ts#L323)

___

### sync

▸ **sync**<`T`\>(`path`, `options`): [`ObservableItemStorage`](../README.md#observableitemstorage)<`T`\>

Create a synchronous storage adapter based on a file.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `PathLike` | The target file path. |
| `options` | `Object` | A serializer/deserializer and whether to watch the file for external changes. |
| `options.observe` | ``true`` | - |
| `options.serde` | [`Serde`](../README.md#serde)<`T`, `string` \| `ArrayBufferView`, `Buffer`\> | - |

#### Returns

[`ObservableItemStorage`](../README.md#observableitemstorage)<`T`\>

#### Defined in

[src/lib/storage-adapters/file.ts:22](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/file.ts#L22)

▸ **sync**<`T`\>(`path`, `options`): [`ItemStorage`](../README.md#itemstorage)<`T`\>

Create a synchronous storage adapter based on a file.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `PathLike` | The target file path. |
| `options` | `Object` | A serializer/deserializer and whether to watch the file for external changes. |
| `options.observe?` | ``false`` | - |
| `options.serde` | [`Serde`](../README.md#serde)<`T`, `string` \| `ArrayBufferView`, `Buffer`\> | - |

#### Returns

[`ItemStorage`](../README.md#itemstorage)<`T`\>

#### Defined in

[src/lib/storage-adapters/file.ts:35](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/file.ts#L35)

▸ **sync**<`T`\>(`path`, `options`): [`ItemStorage`](../README.md#itemstorage)<`T`\> \| [`ObservableItemStorage`](../README.md#observableitemstorage)<`T`\>

Create a synchronous storage adapter based on a file.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `PathLike` | The target file path. |
| `options` | `Object` | A serializer/deserializer and whether to watch the file for external changes. |
| `options.observe?` | `boolean` | - |
| `options.serde` | [`Serde`](../README.md#serde)<`T`, `string` \| `ArrayBufferView`, `Buffer`\> | - |

#### Returns

[`ItemStorage`](../README.md#itemstorage)<`T`\> \| [`ObservableItemStorage`](../README.md#observableitemstorage)<`T`\>

#### Defined in

[src/lib/storage-adapters/file.ts:48](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/file.ts#L48)

___

### textAsync

▸ **textAsync**(`path`, `options?`): [`AsyncItemStorage`](../README.md#asyncitemstorage)<`string`\>

Create an asynchronous storage adapter based on a file with a pre-configured plain-text (utf-8) serializer/deserializer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `PathLike` | The target file path. |
| `options?` | `Object` | Whether to watch the file for external changes. |
| `options.observe?` | ``false`` | - |

#### Returns

[`AsyncItemStorage`](../README.md#asyncitemstorage)<`string`\>

#### Defined in

[src/lib/storage-adapters/file.ts:438](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/file.ts#L438)

▸ **textAsync**(`path`, `options`): [`ObservableAsyncItemStorage`](../README.md#observableasyncitemstorage)<`string`\>

Create an asynchronous storage adapter based on a file with a pre-configured plain-text (utf-8) serializer/deserializer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `PathLike` | The target file path. |
| `options` | `Object` | Whether to watch the file for external changes. |
| `options.observe` | ``true`` | - |

#### Returns

[`ObservableAsyncItemStorage`](../README.md#observableasyncitemstorage)<`string`\>

#### Defined in

[src/lib/storage-adapters/file.ts:448](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/file.ts#L448)

▸ **textAsync**(`path`, `options?`): [`AsyncItemStorage`](../README.md#asyncitemstorage)<`string`\> \| [`ObservableAsyncItemStorage`](../README.md#observableasyncitemstorage)<`string`\>

Create an asynchronous storage adapter based on a file with a pre-configured plain-text (utf-8) serializer/deserializer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `PathLike` | The target file path. |
| `options?` | `Object` | Whether to watch the file for external changes. |
| `options.observe?` | `boolean` | - |

#### Returns

[`AsyncItemStorage`](../README.md#asyncitemstorage)<`string`\> \| [`ObservableAsyncItemStorage`](../README.md#observableasyncitemstorage)<`string`\>

#### Defined in

[src/lib/storage-adapters/file.ts:458](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/file.ts#L458)

___

### textSync

▸ **textSync**(`path`, `options?`): [`ItemStorage`](../README.md#itemstorage)<`string`\>

Create a synchronous storage adapter based on a file with a pre-configured plain-text (utf-8) serializer/deserializer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `PathLike` | The target file path. |
| `options?` | `Object` | Whether to watch the file for external changes. |
| `options.observe?` | ``false`` | - |

#### Returns

[`ItemStorage`](../README.md#itemstorage)<`string`\>

#### Defined in

[src/lib/storage-adapters/file.ts:348](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/file.ts#L348)

▸ **textSync**(`path`, `options`): [`ObservableItemStorage`](../README.md#observableitemstorage)<`string`\>

Create a synchronous storage adapter based on a file with a pre-configured plain-text (utf-8) serializer/deserializer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `PathLike` | The target file path. |
| `options` | `Object` | Whether to watch the file for external changes. |
| `options.observe` | ``true`` | - |

#### Returns

[`ObservableItemStorage`](../README.md#observableitemstorage)<`string`\>

#### Defined in

[src/lib/storage-adapters/file.ts:358](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/file.ts#L358)

▸ **textSync**(`path`, `options?`): [`ItemStorage`](../README.md#itemstorage)<`string`\> \| [`ObservableItemStorage`](../README.md#observableitemstorage)<`string`\>

Create a synchronous storage adapter based on a file with a pre-configured plain-text (utf-8) serializer/deserializer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `PathLike` | The target file path. |
| `options?` | `Object` | Whether to watch the file for external changes. |
| `options.observe?` | `boolean` | - |

#### Returns

[`ItemStorage`](../README.md#itemstorage)<`string`\> \| [`ObservableItemStorage`](../README.md#observableitemstorage)<`string`\>

#### Defined in

[src/lib/storage-adapters/file.ts:368](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/file.ts#L368)
