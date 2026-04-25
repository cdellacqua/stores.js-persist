[**@universal-stores/persist**](../README.md)

***

[@universal-stores/persist](../README.md) / PartialRESTAsyncStorageAdapterConfig

# Type Alias: PartialRESTAsyncStorageAdapterConfig

> **PartialRESTAsyncStorageAdapterConfig** = `object`

Defined in: [src/lib/storage-adapters/rest.ts:27](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/rest.ts#L27)

## Properties

### fetchOptions?

> `optional` **fetchOptions?**: `object`

Defined in: [src/lib/storage-adapters/rest.ts:29](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/rest.ts#L29)

Options that overrides the default fetch configuration.

#### credentials?

> `optional` **credentials?**: `RequestCredentials`

#### headers?

> `optional` **headers?**: `HeadersInit`

#### redirect?

> `optional` **redirect?**: `RequestRedirect`

***

### verbs?

> `optional` **verbs?**: `object`

Defined in: [src/lib/storage-adapters/rest.ts:35](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/rest.ts#L35)

HTTP verbs that should be used to interact with the remote resource.

#### clear?

> `optional` **clear?**: [`HttpVerb`](HttpVerb.md)

#### get?

> `optional` **get?**: [`HttpVerb`](HttpVerb.md)

#### set?

> `optional` **set?**: [`HttpVerbWithBody`](HttpVerbWithBody.md)
