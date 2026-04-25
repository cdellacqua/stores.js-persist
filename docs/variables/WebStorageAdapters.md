[**@universal-stores/persist**](../README.md)

***

[@universal-stores/persist](../README.md) / WebStorageAdapters

# Variable: WebStorageAdapters

> `const` **WebStorageAdapters**: `object`

Defined in: [src/lib/storage-adapters/web-storage.ts:220](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/web-storage.ts#L220)

## Type Declaration

### local

> **local**: \{\<`T`\>(`key`, `options`): [`ItemStorage`](../type-aliases/ItemStorage.md)\<`T`\>; \<`T`\>(`key`, `options?`): [`ObservableItemStorage`](../type-aliases/ObservableItemStorage.md)\<`T`\>; \<`T`\>(`key`, `options?`): [`ItemStorage`](../type-aliases/ItemStorage.md)\<`T`\> \| [`ObservableItemStorage`](../type-aliases/ObservableItemStorage.md)\<`T`\>; \}

#### Call Signature

> \<`T`\>(`key`, `options`): [`ItemStorage`](../type-aliases/ItemStorage.md)\<`T`\>

Generate an ItemStorage based on the localStorage.

##### Type Parameters

###### T

`T`

##### Parameters

###### key

`string`

the key in the localStorage Web Storage API.

###### options

(optional) an object containing a serializer/deserializer and the observe flag.

###### observe?

`false`

(optional, defaults to false) if true listen for storage events to update and emit them to all subscribers of the change$ signal.

###### serde?

[`Serde`](../type-aliases/Serde.md)\<`T`, `string`\>

(optional) an object containing a serialize and deserialize function.

##### Returns

[`ItemStorage`](../type-aliases/ItemStorage.md)\<`T`\>

#### Call Signature

> \<`T`\>(`key`, `options?`): [`ObservableItemStorage`](../type-aliases/ObservableItemStorage.md)\<`T`\>

Generate an ObservableItemStorage based on the localStorage.

##### Type Parameters

###### T

`T`

##### Parameters

###### key

`string`

the key in the localStorage Web Storage API.

###### options?

(optional) an object containing a serializer and the observe flag.

###### observe

`true`

(optional, defaults to false) if true listen for storage events to update and emit them to all subscribers of the change$ signal.

###### serde?

[`Serde`](../type-aliases/Serde.md)\<`T`, `string`\>

(optional) an object containing a serialize and deserialize function.

##### Returns

[`ObservableItemStorage`](../type-aliases/ObservableItemStorage.md)\<`T`\>

#### Call Signature

> \<`T`\>(`key`, `options?`): [`ItemStorage`](../type-aliases/ItemStorage.md)\<`T`\> \| [`ObservableItemStorage`](../type-aliases/ObservableItemStorage.md)\<`T`\>

Generate an ItemStorage or an ObservableItemStorage based on the localStorage.

##### Type Parameters

###### T

`T`

##### Parameters

###### key

`string`

the key in the localStorage Web Storage API.

###### options?

(optional) an object containing a serializer and the observe flag.

###### observe?

`boolean`

(optional, defaults to false) if true listen for storage events to update and emit them to all subscribers of the change$ signal.

###### serde?

[`Serde`](../type-aliases/Serde.md)\<`T`, `string`\>

(optional) an object containing a serialize and deserialize function.

##### Returns

[`ItemStorage`](../type-aliases/ItemStorage.md)\<`T`\> \| [`ObservableItemStorage`](../type-aliases/ObservableItemStorage.md)\<`T`\>

### session

> **session**: \{\<`T`\>(`key`, `options`): [`ItemStorage`](../type-aliases/ItemStorage.md)\<`T`\>; \<`T`\>(`key`, `options?`): [`ObservableItemStorage`](../type-aliases/ObservableItemStorage.md)\<`T`\>; \<`T`\>(`key`, `options?`): [`ItemStorage`](../type-aliases/ItemStorage.md)\<`T`\> \| [`ObservableItemStorage`](../type-aliases/ObservableItemStorage.md)\<`T`\>; \}

#### Call Signature

> \<`T`\>(`key`, `options`): [`ItemStorage`](../type-aliases/ItemStorage.md)\<`T`\>

Generate an ItemStorage based on the sessionStorage.

##### Type Parameters

###### T

`T`

##### Parameters

###### key

`string`

the key in the sessionStorage Web Storage API.

###### options

(optional) an object containing a serializer/deserializer and the observe flag.

###### observe?

`false`

(optional, defaults to false) if true listen for storage events to update and emit them to all subscribers of the change$ signal.

###### serde?

[`Serde`](../type-aliases/Serde.md)\<`T`, `string`\>

(optional) an object containing a serialize and deserialize function.

##### Returns

[`ItemStorage`](../type-aliases/ItemStorage.md)\<`T`\>

#### Call Signature

> \<`T`\>(`key`, `options?`): [`ObservableItemStorage`](../type-aliases/ObservableItemStorage.md)\<`T`\>

Generate an ItemStorage based on the sessionStorage.

##### Type Parameters

###### T

`T`

##### Parameters

###### key

`string`

the key in the sessionStorage Web Storage API.

###### options?

(optional) an object containing a serializer/deserializer and the observe flag.

###### observe

`true`

(optional, defaults to false) if true listen for storage events to update and emit them to all subscribers of the change$ signal.

###### serde?

[`Serde`](../type-aliases/Serde.md)\<`T`, `string`\>

(optional) an object containing a serialize and deserialize function.

##### Returns

[`ObservableItemStorage`](../type-aliases/ObservableItemStorage.md)\<`T`\>

#### Call Signature

> \<`T`\>(`key`, `options?`): [`ItemStorage`](../type-aliases/ItemStorage.md)\<`T`\> \| [`ObservableItemStorage`](../type-aliases/ObservableItemStorage.md)\<`T`\>

Generate an ItemStorage based on the sessionStorage.

##### Type Parameters

###### T

`T`

##### Parameters

###### key

`string`

the key in the sessionStorage Web Storage API.

###### options?

(optional) an object containing a serializer/deserializer and the observe flag.

###### observe?

`boolean`

(optional, defaults to false) if true listen for storage events to update and emit them to all subscribers of the change$ signal.

###### serde?

[`Serde`](../type-aliases/Serde.md)\<`T`, `string`\>

(optional) an object containing a serialize and deserialize function.

##### Returns

[`ItemStorage`](../type-aliases/ItemStorage.md)\<`T`\> \| [`ObservableItemStorage`](../type-aliases/ObservableItemStorage.md)\<`T`\>
