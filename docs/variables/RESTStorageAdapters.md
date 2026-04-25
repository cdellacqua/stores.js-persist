[**@universal-stores/persist**](../README.md)

***

[@universal-stores/persist](../README.md) / RESTStorageAdapters

# Variable: RESTStorageAdapters

> `const` **RESTStorageAdapters**: `object`

Defined in: [src/lib/storage-adapters/rest.ts:155](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/rest.ts#L155)

## Type Declaration

### async

> **async**: \<`T`, `TBody`\>(`resourceUrl`, `config`) => [`AsyncItemStorage`](../type-aliases/AsyncItemStorage.md)\<`T`\>

Generate an HTTP-based AsyncItemStorage that uses fetch and the HTTP verbs to interact with a remote resource.
By default, the HTTP verbs that this storage uses are GET, PUT and DELETE, but they can be overridden using
the `config` parameter.

#### Type Parameters

##### T

`T`

##### TBody

`TBody`

#### Parameters

##### resourceUrl

`string`

The URL of the API responsible for the remote resource.

##### config

[`RestAsyncStorageAdapterConfig`](../type-aliases/RestAsyncStorageAdapterConfig.md)\<`T`, `TBody`\>

Configuration object containing information on how to deal with the remote resource.

#### Returns

[`AsyncItemStorage`](../type-aliases/AsyncItemStorage.md)\<`T`\>

### jsonAsync

> **jsonAsync**: \<`T`\>(`resourceUrl`, `config?`) => [`AsyncItemStorage`](../type-aliases/AsyncItemStorage.md)\<`T`\>

Generate a pre-configured HTTP-based AsyncItemStorage that serialize/deserialize to/from JSON and that uses fetch and the HTTP verbs to interact with a remote resource.
By default, the HTTP verbs that this storage uses are GET, PUT and DELETE, but they can be overridden using
the `config` parameter.

#### Type Parameters

##### T

`T`

#### Parameters

##### resourceUrl

`string`

The URL of the API responsible for the remote resource.

##### config?

[`PartialRESTAsyncStorageAdapterConfig`](../type-aliases/PartialRESTAsyncStorageAdapterConfig.md)

Configuration object containing information on how to deal with the remote resource.

#### Returns

[`AsyncItemStorage`](../type-aliases/AsyncItemStorage.md)\<`T`\>

### textAsync

> **textAsync**: (`resourceUrl`, `config?`) => [`AsyncItemStorage`](../type-aliases/AsyncItemStorage.md)\<`string`\>

Generate a pre-configured HTTP-based AsyncItemStorage that serialize/deserialize to/from plain-text and that uses fetch and the HTTP verbs to interact with a remote resource.
By default, the HTTP verbs that this storage uses are GET, PUT and DELETE, but they can be overridden using
the `config` parameter.

#### Parameters

##### resourceUrl

`string`

The URL of the API responsible for the remote resource.

##### config?

[`PartialRESTAsyncStorageAdapterConfig`](../type-aliases/PartialRESTAsyncStorageAdapterConfig.md)

Configuration object containing information on how to deal with the remote resource.

#### Returns

[`AsyncItemStorage`](../type-aliases/AsyncItemStorage.md)\<`string`\>
