[@universal-stores/persist](../README.md) / WebStorageAdapters

# Namespace: WebStorageAdapters

## Table of contents

### Functions

- [local](WebStorageAdapters.md#local)
- [session](WebStorageAdapters.md#session)

## Functions

### local

▸ **local**<`T`\>(`key`, `options`): [`ItemStorage`](../README.md#itemstorage)<`T`\>

Generate an ItemStorage based on the localStorage.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | the key in the localStorage Web Storage API. |
| `options` | `Object` | (optional) an object containing a serializer/deserializer and the observe flag. |
| `options.observe?` | ``false`` | (optional, defaults to false) if true listen for storage events to update and emit them to all subscribers of the change$ signal. |
| `options.serde?` | [`Serde`](../README.md#serde)<`T`, `string`, `string`\> | (optional) an object containing a serialize and deserialize function. |

#### Returns

[`ItemStorage`](../README.md#itemstorage)<`T`\>

#### Defined in

[src/lib/storage-adapters/web-storage.ts:93](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/web-storage.ts#L93)

▸ **local**<`T`\>(`key`, `options?`): [`ObservableItemStorage`](../README.md#observableitemstorage)<`T`\>

Generate an ObservableItemStorage based on the localStorage.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | the key in the localStorage Web Storage API. |
| `options?` | `Object` | (optional) an object containing a serializer and the observe flag. |
| `options.observe` | ``true`` | (optional, defaults to false) if true listen for storage events to update and emit them to all subscribers of the change$ signal. |
| `options.serde?` | [`Serde`](../README.md#serde)<`T`, `string`, `string`\> | (optional) an object containing a serialize and deserialize function. |

#### Returns

[`ObservableItemStorage`](../README.md#observableitemstorage)<`T`\>

#### Defined in

[src/lib/storage-adapters/web-storage.ts:109](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/web-storage.ts#L109)

▸ **local**<`T`\>(`key`, `options?`): [`ItemStorage`](../README.md#itemstorage)<`T`\> \| [`ObservableItemStorage`](../README.md#observableitemstorage)<`T`\>

Generate an ItemStorage or an ObservableItemStorage based on the localStorage.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | the key in the localStorage Web Storage API. |
| `options?` | `Object` | (optional) an object containing a serializer and the observe flag. |
| `options.observe?` | `boolean` | (optional, defaults to false) if true listen for storage events to update and emit them to all subscribers of the change$ signal. |
| `options.serde?` | [`Serde`](../README.md#serde)<`T`, `string`, `string`\> | (optional) an object containing a serialize and deserialize function. |

#### Returns

[`ItemStorage`](../README.md#itemstorage)<`T`\> \| [`ObservableItemStorage`](../README.md#observableitemstorage)<`T`\>

#### Defined in

[src/lib/storage-adapters/web-storage.ts:125](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/web-storage.ts#L125)

___

### session

▸ **session**<`T`\>(`key`, `options`): [`ItemStorage`](../README.md#itemstorage)<`T`\>

Generate an ItemStorage based on the sessionStorage.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | the key in the sessionStorage Web Storage API. |
| `options` | `Object` | (optional) an object containing a serializer/deserializer and the observe flag. |
| `options.observe?` | ``false`` | (optional, defaults to false) if true listen for storage events to update and emit them to all subscribers of the change$ signal. |
| `options.serde?` | [`Serde`](../README.md#serde)<`T`, `string`, `string`\> | (optional) an object containing a serialize and deserialize function. |

#### Returns

[`ItemStorage`](../README.md#itemstorage)<`T`\>

#### Defined in

[src/lib/storage-adapters/web-storage.ts:161](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/web-storage.ts#L161)

▸ **session**<`T`\>(`key`, `options?`): [`ObservableItemStorage`](../README.md#observableitemstorage)<`T`\>

Generate an ItemStorage based on the sessionStorage.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | the key in the sessionStorage Web Storage API. |
| `options?` | `Object` | (optional) an object containing a serializer/deserializer and the observe flag. |
| `options.observe` | ``true`` | (optional, defaults to false) if true listen for storage events to update and emit them to all subscribers of the change$ signal. |
| `options.serde?` | [`Serde`](../README.md#serde)<`T`, `string`, `string`\> | (optional) an object containing a serialize and deserialize function. |

#### Returns

[`ObservableItemStorage`](../README.md#observableitemstorage)<`T`\>

#### Defined in

[src/lib/storage-adapters/web-storage.ts:177](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/web-storage.ts#L177)

▸ **session**<`T`\>(`key`, `options?`): [`ItemStorage`](../README.md#itemstorage)<`T`\> \| [`ObservableItemStorage`](../README.md#observableitemstorage)<`T`\>

Generate an ItemStorage based on the sessionStorage.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | the key in the sessionStorage Web Storage API. |
| `options?` | `Object` | (optional) an object containing a serializer/deserializer and the observe flag. |
| `options.observe?` | `boolean` | (optional, defaults to false) if true listen for storage events to update and emit them to all subscribers of the change$ signal. |
| `options.serde?` | [`Serde`](../README.md#serde)<`T`, `string`, `string`\> | (optional) an object containing a serialize and deserialize function. |

#### Returns

[`ItemStorage`](../README.md#itemstorage)<`T`\> \| [`ObservableItemStorage`](../README.md#observableitemstorage)<`T`\>

#### Defined in

[src/lib/storage-adapters/web-storage.ts:193](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/web-storage.ts#L193)
