import {expect} from 'chai';
import {
	JSONDeserializationError,
	makeJSONSerde,
} from '../../src/lib/storage-adapters/serde/json-serde';

describe('test json converter', () => {
	it('stringifies as usual', () => {
		const jsonConverter = makeJSONSerde<
			{a: number; b: string} | number | string | null | boolean | Array<string>
		>();
		expect(jsonConverter.serialize({a: 1, b: 'hello'})).to.eqls(
			JSON.stringify({a: 1, b: 'hello'}),
		);
		expect(jsonConverter.serialize('hello')).to.eqls(JSON.stringify('hello'));
		expect(jsonConverter.serialize(2)).to.eqls(JSON.stringify(2));
		expect(jsonConverter.serialize(null)).to.eqls(JSON.stringify(null));
		expect(jsonConverter.serialize(true)).to.eqls(JSON.stringify(true));
		expect(jsonConverter.serialize(false)).to.eqls(JSON.stringify(false));
		expect(jsonConverter.serialize(['hi'])).to.eqls(JSON.stringify(['hi']));
	});
	it('parses as usual', () => {
		const jsonConverter = makeJSONSerde<
			{a: number; b: string} | number | string | null | boolean | Array<string>
		>();
		expect(
			jsonConverter.deserialize(JSON.stringify({a: 1, b: 'hello'})),
		).to.eqls({a: 1, b: 'hello'});
		expect(jsonConverter.deserialize(JSON.stringify('hello'))).to.eqls('hello');
		expect(jsonConverter.deserialize(JSON.stringify(2))).to.eqls(2);
		expect(jsonConverter.deserialize(JSON.stringify(null))).to.eqls(null);
		expect(jsonConverter.deserialize(JSON.stringify(true))).to.eqls(true);
		expect(jsonConverter.deserialize(JSON.stringify(false))).to.eqls(false);
		expect(jsonConverter.deserialize(JSON.stringify(['hi']))).to.eqls(['hi']);
	});
	it('throws when it tries to stringify an invalid value', () => {
		const jsonConverter = makeJSONSerde<
			| {a: number; b: string}
			| number
			| string
			| null
			| boolean
			| Array<string>
			| undefined
		>();
		expect(() => jsonConverter.serialize(undefined)).to.throw(
			JSONDeserializationError,
		);
	});
});
