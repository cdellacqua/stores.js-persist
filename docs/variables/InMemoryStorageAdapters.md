[**@universal-stores/persist**](../README.md)

***

[@universal-stores/persist](../README.md) / InMemoryStorageAdapters

# Variable: InMemoryStorageAdapters

> `const` **InMemoryStorageAdapters**: `object`

Defined in: [src/lib/storage-adapters/memory.ts:44](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/memory.ts#L44)

## Type Declaration

### async

> **async**: \<`T`\>(`defaultValue?`) => [`AsyncItemStorage`](../type-aliases/AsyncItemStorage.md)\<`T`\>

Generate an in-memory AsyncItemStorage. This adapter is not very useful per se, but
it can be used for testing purposes and for mixed SSR-CSR scenarios when
the server is prerendering content by running the same code as the client (e.g. Next.js, SvelteKit).

#### Type Parameters

##### T

`T`

#### Parameters

##### defaultValue?

`T`

#### Returns

[`AsyncItemStorage`](../type-aliases/AsyncItemStorage.md)\<`T`\>

### sync

> **sync**: \<`T`\>(`defaultValue?`) => [`ItemStorage`](../type-aliases/ItemStorage.md)\<`T`\>

Generate an in-memory ItemStorage. This adapter is not very useful per se, but
it can be used for testing purposes and for mixed SSR-CSR scenarios when
the server is prerendering content by running the same code as the client (e.g. Next.js, SvelteKit).

#### Type Parameters

##### T

`T`

#### Parameters

##### defaultValue?

`T`

#### Returns

[`ItemStorage`](../type-aliases/ItemStorage.md)\<`T`\>
