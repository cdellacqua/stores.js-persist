[**@universal-stores/persist**](../README.md)

***

[@universal-stores/persist](../README.md) / RestAsyncStorageAdapterConfig

# Type Alias: RestAsyncStorageAdapterConfig\<T, TBody\>

> **RestAsyncStorageAdapterConfig**\<`T`, `TBody`\> = `object`

Defined in: [src/lib/storage-adapters/rest.ts:8](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/rest.ts#L8)

## Type Parameters

### T

`T`

### TBody

`TBody` = `T`

## Properties

### bodyExtractor

> **bodyExtractor**: (`response`) => `Promise`\<`TBody`\>

Defined in: [src/lib/storage-adapters/rest.ts:18](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/rest.ts#L18)

A function that, given the fetch response object, returns the useful content that needs to be deserialized.

#### Parameters

##### response

`Response`

#### Returns

`Promise`\<`TBody`\>

***

### fetchOptions?

> `optional` **fetchOptions?**: `object`

Defined in: [src/lib/storage-adapters/rest.ts:12](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/rest.ts#L12)

Options that overrides the default fetch configuration.

#### credentials?

> `optional` **credentials?**: `RequestCredentials`

#### headers?

> `optional` **headers?**: `HeadersInit`

#### redirect?

> `optional` **redirect?**: `RequestRedirect`

***

### serde

> **serde**: [`AsyncSerde`](AsyncSerde.md)\<`T`, `BodyInit`, `TBody`\>

Defined in: [src/lib/storage-adapters/rest.ts:10](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/rest.ts#L10)

A serializer/deserializer.

***

### verbs?

> `optional` **verbs?**: `object`

Defined in: [src/lib/storage-adapters/rest.ts:20](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/rest.ts#L20)

HTTP verbs that should be used to interact with the remote resource.

#### clear?

> `optional` **clear?**: [`HttpVerb`](HttpVerb.md)

#### get?

> `optional` **get?**: [`HttpVerb`](HttpVerb.md)

#### set?

> `optional` **set?**: [`HttpVerbWithBody`](HttpVerbWithBody.md)
