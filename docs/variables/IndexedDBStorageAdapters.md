[**@universal-stores/persist**](../README.md)

***

[@universal-stores/persist](../README.md) / IndexedDBStorageAdapters

# Variable: IndexedDBStorageAdapters

> `const` **IndexedDBStorageAdapters**: `object`

Defined in: [src/lib/storage-adapters/indexed-db.ts:247](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/indexed-db.ts#L247)

## Type Declaration

### async

> **async**: \{\<`T`, `TSerialized`\>(`key`, `options`): [`ObservableAsyncItemStorage`](../type-aliases/ObservableAsyncItemStorage.md)\<`T`\>; \<`T`, `TSerialized`\>(`key`, `options`): [`AsyncItemStorage`](../type-aliases/AsyncItemStorage.md)\<`T`\>; \<`T`, `TSerialized`\>(`key`, `options`): [`AsyncItemStorage`](../type-aliases/AsyncItemStorage.md)\<`T`\> \| [`ObservableAsyncItemStorage`](../type-aliases/ObservableAsyncItemStorage.md)\<`T`\>; \}

#### Call Signature

> \<`T`, `TSerialized`\>(`key`, `options`): [`ObservableAsyncItemStorage`](../type-aliases/ObservableAsyncItemStorage.md)\<`T`\>

Generate an AsyncItemStorage backed by IndexedDB.

##### Type Parameters

###### T

`T`

###### TSerialized

`TSerialized` = `T`

##### Parameters

###### key

`IDBValidKey`

the IDBValidKey identifying the record within the object store.

###### options

configuration object.

###### dbName

`string`

the name of the IndexedDB database.

###### observe

`true`

(optional, defaults to false) if true, listen for cross-context BroadcastChannel messages and emit them to all subscribers of the change$ signal.

###### serde?

[`AsyncSerde`](../type-aliases/AsyncSerde.md)\<`T`, `TSerialized`\>

(optional, defaults to an identity serde) an AsyncSerde used to convert T to/from a structured-cloneable value.

###### storeName?

`string`

(optional, defaults to "kv") the name of the object store within the database.

##### Returns

[`ObservableAsyncItemStorage`](../type-aliases/ObservableAsyncItemStorage.md)\<`T`\>

#### Call Signature

> \<`T`, `TSerialized`\>(`key`, `options`): [`AsyncItemStorage`](../type-aliases/AsyncItemStorage.md)\<`T`\>

Generate an AsyncItemStorage backed by IndexedDB.

##### Type Parameters

###### T

`T`

###### TSerialized

`TSerialized` = `T`

##### Parameters

###### key

`IDBValidKey`

the IDBValidKey identifying the record within the object store.

###### options

configuration object.

###### dbName

`string`

the name of the IndexedDB database.

###### observe?

`false`

(optional, defaults to false) if true, listen for cross-context BroadcastChannel messages and emit them to all subscribers of the change$ signal.

###### serde?

[`AsyncSerde`](../type-aliases/AsyncSerde.md)\<`T`, `TSerialized`\>

(optional, defaults to an identity serde) an AsyncSerde used to convert T to/from a structured-cloneable value.

###### storeName?

`string`

(optional, defaults to "kv") the name of the object store within the database.

##### Returns

[`AsyncItemStorage`](../type-aliases/AsyncItemStorage.md)\<`T`\>

#### Call Signature

> \<`T`, `TSerialized`\>(`key`, `options`): [`AsyncItemStorage`](../type-aliases/AsyncItemStorage.md)\<`T`\> \| [`ObservableAsyncItemStorage`](../type-aliases/ObservableAsyncItemStorage.md)\<`T`\>

Generate an AsyncItemStorage or ObservableAsyncItemStorage backed by IndexedDB.

##### Type Parameters

###### T

`T`

###### TSerialized

`TSerialized` = `T`

##### Parameters

###### key

`IDBValidKey`

the IDBValidKey identifying the record within the object store.

###### options

configuration object.

###### dbName

`string`

the name of the IndexedDB database.

###### observe?

`boolean`

(optional, defaults to false) if true, listen for cross-context BroadcastChannel messages and emit them to all subscribers of the change$ signal.

###### serde?

[`AsyncSerde`](../type-aliases/AsyncSerde.md)\<`T`, `TSerialized`\>

(optional, defaults to an identity serde) an AsyncSerde used to convert T to/from a structured-cloneable value.

###### storeName?

`string`

(optional, defaults to "kv") the name of the object store within the database.

##### Returns

[`AsyncItemStorage`](../type-aliases/AsyncItemStorage.md)\<`T`\> \| [`ObservableAsyncItemStorage`](../type-aliases/ObservableAsyncItemStorage.md)\<`T`\>
