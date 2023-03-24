[@universal-stores/persist](../README.md) / JSONDeserializationError

# Class: JSONDeserializationError<T\>

Error emitted when JSON.stringify returns undefined
instead of a valid string.

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- `Error`

  ↳ **`JSONDeserializationError`**

## Table of contents

### Constructors

- [constructor](JSONDeserializationError.md#constructor)

### Properties

- [cause](JSONDeserializationError.md#cause)
- [deserialized](JSONDeserializationError.md#deserialized)
- [message](JSONDeserializationError.md#message)
- [name](JSONDeserializationError.md#name)
- [stack](JSONDeserializationError.md#stack)
- [prepareStackTrace](JSONDeserializationError.md#preparestacktrace)
- [stackTraceLimit](JSONDeserializationError.md#stacktracelimit)

### Methods

- [captureStackTrace](JSONDeserializationError.md#capturestacktrace)

## Constructors

### constructor

• **new JSONDeserializationError**<`T`\>(`message`, `deserialized`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `deserialized` | `T` |

#### Overrides

Error.constructor

#### Defined in

[src/lib/storage-adapters/serde/json-serde.ts:8](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/serde/json-serde.ts#L8)

## Properties

### cause

• `Optional` **cause**: `Error`

#### Inherited from

Error.cause

#### Defined in

node_modules/typescript/lib/lib.es2022.error.d.ts:26

___

### deserialized

• **deserialized**: `T`

#### Defined in

[src/lib/storage-adapters/serde/json-serde.ts:8](https://github.com/cdellacqua/stores.js-persist/blob/main/src/lib/storage-adapters/serde/json-serde.ts#L8)

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1029

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1028

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1030

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:4
