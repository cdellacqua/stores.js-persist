[@universal-stores/persist](../README.md) / RESTStorageAdapters

# Namespace: RESTStorageAdapters

## Table of contents

### Type Aliases

- [HttpVerb](RESTStorageAdapters.md#httpverb)
- [HttpVerbWithBody](RESTStorageAdapters.md#httpverbwithbody)
- [HttpVerbsWithoutBody](RESTStorageAdapters.md#httpverbswithoutbody)
- [PartialRESTAsyncStorageAdapterConfig](RESTStorageAdapters.md#partialrestasyncstorageadapterconfig)
- [RestAsyncStorageAdapterConfig](RESTStorageAdapters.md#restasyncstorageadapterconfig)

### Functions

- [async](RESTStorageAdapters.md#async)
- [jsonAsync](RESTStorageAdapters.md#jsonasync)
- [textAsync](RESTStorageAdapters.md#textasync)

## Type Aliases

### HttpVerb

Ƭ **HttpVerb**: [`HttpVerbsWithoutBody`](RESTStorageAdapters.md#httpverbswithoutbody) \| [`HttpVerbWithBody`](RESTStorageAdapters.md#httpverbwithbody)

#### Defined in

[src/lib/storage-adapters/rest.ts:6](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/rest.ts#L6)

___

### HttpVerbWithBody

Ƭ **HttpVerbWithBody**: ``"POST"`` \| ``"PUT"`` \| ``"PATCH"`` \| ``"DELETE"``

#### Defined in

[src/lib/storage-adapters/rest.ts:5](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/rest.ts#L5)

___

### HttpVerbsWithoutBody

Ƭ **HttpVerbsWithoutBody**: ``"GET"``

#### Defined in

[src/lib/storage-adapters/rest.ts:4](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/rest.ts#L4)

___

### PartialRESTAsyncStorageAdapterConfig

Ƭ **PartialRESTAsyncStorageAdapterConfig**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `fetchOptions?` | { `credentials?`: `RequestCredentials` ; `headers?`: `HeadersInit` ; `redirect?`: `RequestRedirect`  } | Options that overrides the default fetch configuration. |
| `fetchOptions.credentials?` | `RequestCredentials` | - |
| `fetchOptions.headers?` | `HeadersInit` | - |
| `fetchOptions.redirect?` | `RequestRedirect` | - |
| `verbs?` | { `clear?`: [`HttpVerb`](RESTStorageAdapters.md#httpverb) ; `get?`: [`HttpVerb`](RESTStorageAdapters.md#httpverb) ; `set?`: [`HttpVerbWithBody`](RESTStorageAdapters.md#httpverbwithbody)  } | HTTP verbs that should be used to interact with the remote resource. |
| `verbs.clear?` | [`HttpVerb`](RESTStorageAdapters.md#httpverb) | - |
| `verbs.get?` | [`HttpVerb`](RESTStorageAdapters.md#httpverb) | - |
| `verbs.set?` | [`HttpVerbWithBody`](RESTStorageAdapters.md#httpverbwithbody) | - |

#### Defined in

[src/lib/storage-adapters/rest.ts:27](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/rest.ts#L27)

___

### RestAsyncStorageAdapterConfig

Ƭ **RestAsyncStorageAdapterConfig**<`T`, `TBody`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `TBody` | `T` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `bodyExtractor` | (`response`: `Response`) => `Promise`<`TBody`\> | A function that, given the fetch response object, returns the useful content that needs to be deserialized. |
| `fetchOptions?` | { `credentials?`: `RequestCredentials` ; `headers?`: `HeadersInit` ; `redirect?`: `RequestRedirect`  } | Options that overrides the default fetch configuration. |
| `fetchOptions.credentials?` | `RequestCredentials` | - |
| `fetchOptions.headers?` | `HeadersInit` | - |
| `fetchOptions.redirect?` | `RequestRedirect` | - |
| `serde` | [`AsyncSerde`](../README.md#asyncserde)<`T`, `BodyInit`, `TBody`\> | A serializer/deserializer. |
| `verbs?` | { `clear?`: [`HttpVerb`](RESTStorageAdapters.md#httpverb) ; `get?`: [`HttpVerb`](RESTStorageAdapters.md#httpverb) ; `set?`: [`HttpVerbWithBody`](RESTStorageAdapters.md#httpverbwithbody)  } | HTTP verbs that should be used to interact with the remote resource. |
| `verbs.clear?` | [`HttpVerb`](RESTStorageAdapters.md#httpverb) | - |
| `verbs.get?` | [`HttpVerb`](RESTStorageAdapters.md#httpverb) | - |
| `verbs.set?` | [`HttpVerbWithBody`](RESTStorageAdapters.md#httpverbwithbody) | - |

#### Defined in

[src/lib/storage-adapters/rest.ts:8](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/rest.ts#L8)

## Functions

### async

▸ **async**<`T`, `TBody`\>(`resourceUrl`, `config`): [`AsyncItemStorage`](../README.md#asyncitemstorage)<`T`\>

Generate an HTTP-based AsyncItemStorage that uses fetch and the HTTP verbs to interact with a remote resource.
By default, the HTTP verbs that this storage uses are GET, PUT and DELETE, but they can be overridden using
the `config` parameter.

#### Type parameters

| Name |
| :------ |
| `T` |
| `TBody` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resourceUrl` | `string` | The URL of the API responsible for the remote resource. |
| `config` | [`RestAsyncStorageAdapterConfig`](RESTStorageAdapters.md#restasyncstorageadapterconfig)<`T`, `TBody`\> | Configuration object containing information on how to deal with the remote resource. |

#### Returns

[`AsyncItemStorage`](../README.md#asyncitemstorage)<`T`\>

#### Defined in

[src/lib/storage-adapters/rest.ts:50](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/rest.ts#L50)

___

### jsonAsync

▸ **jsonAsync**<`T`\>(`resourceUrl`, `config?`): [`AsyncItemStorage`](../README.md#asyncitemstorage)<`T`\>

Generate a pre-configured HTTP-based AsyncItemStorage that serialize/deserialize to/from JSON and that uses fetch and the HTTP verbs to interact with a remote resource.
By default, the HTTP verbs that this storage uses are GET, PUT and DELETE, but they can be overridden using
the `config` parameter.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resourceUrl` | `string` | The URL of the API responsible for the remote resource. |
| `config?` | [`PartialRESTAsyncStorageAdapterConfig`](RESTStorageAdapters.md#partialrestasyncstorageadapterconfig) | Configuration object containing information on how to deal with the remote resource. |

#### Returns

[`AsyncItemStorage`](../README.md#asyncitemstorage)<`T`\>

#### Defined in

[src/lib/storage-adapters/rest.ts:104](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/rest.ts#L104)

___

### textAsync

▸ **textAsync**(`resourceUrl`, `config?`): [`AsyncItemStorage`](../README.md#asyncitemstorage)<`string`\>

Generate a pre-configured HTTP-based AsyncItemStorage that serialize/deserialize to/from plain-text and that uses fetch and the HTTP verbs to interact with a remote resource.
By default, the HTTP verbs that this storage uses are GET, PUT and DELETE, but they can be overridden using
the `config` parameter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resourceUrl` | `string` | The URL of the API responsible for the remote resource. |
| `config?` | [`PartialRESTAsyncStorageAdapterConfig`](RESTStorageAdapters.md#partialrestasyncstorageadapterconfig) | Configuration object containing information on how to deal with the remote resource. |

#### Returns

[`AsyncItemStorage`](../README.md#asyncitemstorage)<`string`\>

#### Defined in

[src/lib/storage-adapters/rest.ts:134](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/rest.ts#L134)
