[**@universal-stores/persist**](../README.md)

***

[@universal-stores/persist](../README.md) / makeJSONSerde

# Function: makeJSONSerde()

> **makeJSONSerde**\<`T`\>(): [`Serde`](../type-aliases/Serde.md)\<`T`, `string`\>

Defined in: [src/lib/storage-adapters/serde/json-serde.ts:18](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/serde/json-serde.ts#L18)

Create a JSON serializer/deserializer that consists of JSON.parse/stringify.
The deserialization procedure throws a [JSONDeserializationError](../classes/JSONDeserializationError.md) when
JSON.stringify returns `undefined` instead of a string.

## Type Parameters

### T

`T`

## Returns

[`Serde`](../type-aliases/Serde.md)\<`T`, `string`\>
