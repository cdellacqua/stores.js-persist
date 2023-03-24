[@universal-stores/persist](../README.md) / InMemoryStorageAdapters

# Namespace: InMemoryStorageAdapters

## Table of contents

### Functions

- [async](InMemoryStorageAdapters.md#async)
- [sync](InMemoryStorageAdapters.md#sync)

## Functions

### async

▸ **async**<`T`\>(`defaultValue?`): [`AsyncItemStorage`](../README.md#asyncitemstorage)<`T`\>

Generate an in-memory AsyncItemStorage. This adapter is not very useful per se, but
it can be used for testing purposes and for mixed SSR-CSR scenarios when
the server is prerendering content by running the same code as the client (e.g. Next.js, SvelteKit).

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `defaultValue?` | `T` |

#### Returns

[`AsyncItemStorage`](../README.md#asyncitemstorage)<`T`\>

#### Defined in

[src/lib/storage-adapters/memory.ts:26](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/memory.ts#L26)

___

### sync

▸ **sync**<`T`\>(`defaultValue?`): [`ItemStorage`](../README.md#itemstorage)<`T`\>

Generate an in-memory ItemStorage. This adapter is not very useful per se, but
it can be used for testing purposes and for mixed SSR-CSR scenarios when
the server is prerendering content by running the same code as the client (e.g. Next.js, SvelteKit).

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `defaultValue?` | `T` |

#### Returns

[`ItemStorage`](../README.md#itemstorage)<`T`\>

#### Defined in

[src/lib/storage-adapters/memory.ts:8](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/memory.ts#L8)
