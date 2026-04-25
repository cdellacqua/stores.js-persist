[**@universal-stores/persist**](../README.md)

***

[@universal-stores/persist](../README.md) / Serde

# Type Alias: Serde\<TSerializable, TSerialized, TDeserializable\>

> **Serde**\<`TSerializable`, `TSerialized`, `TDeserializable`\> = `object`

Defined in: [src/lib/storage-adapters/shared.ts:6](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/shared.ts#L6)

A serializer/deserializer.

## Type Parameters

### TSerializable

`TSerializable`

### TSerialized

`TSerialized`

### TDeserializable

`TDeserializable` = `TSerialized`

## Methods

### deserialize()

> **deserialize**(`serialized`): `TSerializable`

Defined in: [src/lib/storage-adapters/shared.ts:14](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/shared.ts#L14)

Convert the passed value from a serialized form to its deserialized one.

#### Parameters

##### serialized

`TDeserializable`

#### Returns

`TSerializable`

***

### serialize()

> **serialize**(`deserialized`): `TSerialized`

Defined in: [src/lib/storage-adapters/shared.ts:10](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/shared.ts#L10)

Convert the passed value from its deserialized form to a serialized one.

#### Parameters

##### deserialized

`TSerializable`

#### Returns

`TSerialized`
