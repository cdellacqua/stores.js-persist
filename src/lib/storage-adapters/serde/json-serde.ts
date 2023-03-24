import {Serde} from '../shared';

/**
 * Error emitted when JSON.stringify returns undefined
 * instead of a valid string.
 */
export class JSONDeserializationError<T> extends Error {
	constructor(message: string, public deserialized: T) {
		super(message);
	}
}

/**
 * Create a JSON serializer/deserializer that consists of JSON.parse/stringify.
 * The deserialization procedure throws a {@link JSONDeserializationError} when
 * JSON.stringify returns `undefined` instead of a string.
 */
export function makeJSONSerde<T>(): Serde<T, string> {
	return {
		deserialize(serialized) {
			return JSON.parse(serialized);
		},
		serialize(deserialized) {
			const serialized = JSON.stringify(deserialized);
			if (serialized === undefined) {
				throw new JSONDeserializationError(
					'unable to serialize content',
					deserialized,
				);
			}
			return serialized;
		},
	};
}
