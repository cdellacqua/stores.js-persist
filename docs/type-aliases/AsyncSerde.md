[**@universal-stores/persist**](../README.md)

***

[@universal-stores/persist](../README.md) / AsyncSerde

# Type Alias: AsyncSerde\<TSerializable, TSerialized, TDeserializable\>

> **AsyncSerde**\<`TSerializable`, `TSerialized`, `TDeserializable`\> = `object`

Defined in: [src/lib/storage-adapters/shared.ts:20](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/shared.ts#L20)

An asynchronous serializer/deserializer.

## Type Parameters

### TSerializable

`TSerializable`

### TSerialized

`TSerialized`

### TDeserializable

`TDeserializable` = `TSerialized`

## Methods

### deserialize()

> **deserialize**(`serialized`): `TSerializable` \| `Promise`\<`TSerializable`\>

Defined in: [src/lib/storage-adapters/shared.ts:32](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/shared.ts#L32)

Convert the passed value from a serialized form to its deserialized one.

#### Parameters

##### serialized

`TDeserializable`

#### Returns

`TSerializable` \| `Promise`\<`TSerializable`\>

***

### serialize()

> **serialize**(`deserialized`): `TSerialized` \| `Promise`\<`TSerialized`\>

Defined in: [src/lib/storage-adapters/shared.ts:28](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/shared.ts#L28)

Convert the passed value from its deserialized form to a serialized one.

#### Parameters

##### deserialized

`TSerializable`

#### Returns

`TSerialized` \| `Promise`\<`TSerialized`\>
