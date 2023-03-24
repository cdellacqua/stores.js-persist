import {expect} from 'chai';
import {existsSync, mkdirSync, readFileSync, rmSync, writeFileSync} from 'fs';
import {join} from 'path';
import {FileStorageAdapters} from '../../src/lib';

describe('file adapter (observe variant)', () => {
	mkdirSync('tmp', {recursive: true});
	const testFilePath = join('tmp', 'test-observe.bin');
	beforeEach(() => {
		if (existsSync(testFilePath)) {
			rmSync(testFilePath);
		}
	});
	it('tests synchronous R/W on filesystem', () => {
		const adapter = FileStorageAdapters.sync<Uint8Array>(testFilePath, {
			serde: {
				serialize: (content) => Buffer.from(content),
				deserialize: (buffer) => new Uint8Array(buffer),
			},
			observe: true,
		});
		expect(existsSync(testFilePath)).to.be.false;
		expect(adapter.get()).to.be.undefined;
		expect(existsSync(testFilePath)).to.be.false;
		adapter.set(new Uint8Array([1, 2, 3]));
		expect(existsSync(testFilePath)).to.be.true;
		expect(new Uint8Array(readFileSync(testFilePath))).to.eqls(
			new Uint8Array([1, 2, 3]),
		);
		expect(adapter.get()).to.eqls(new Uint8Array([1, 2, 3]));
		adapter.unobserve();
	});
	it('tests asynchronous R/W on filesystem', async () => {
		const adapter = FileStorageAdapters.async<Uint8Array>(testFilePath, {
			serde: {
				serialize: (content) => Buffer.from(content),
				deserialize: (buffer) => Promise.resolve(new Uint8Array(buffer)),
			},
			observe: true,
		});
		expect(existsSync(testFilePath)).to.be.false;
		expect(await adapter.get()).to.be.undefined;
		expect(existsSync(testFilePath)).to.be.false;
		await adapter.set(new Uint8Array([1, 2, 3]));
		expect(existsSync(testFilePath)).to.be.true;
		expect(new Uint8Array(readFileSync(testFilePath))).to.eqls(
			new Uint8Array([1, 2, 3]),
		);
		expect(await adapter.get()).to.eqls(new Uint8Array([1, 2, 3]));
		adapter.unobserve();
	});

	it('tests synchronous clear on filesystem', () => {
		const adapter = FileStorageAdapters.sync<Uint8Array>(testFilePath, {
			serde: {
				serialize: (content) => Buffer.from(content),
				deserialize: (buffer) => new Uint8Array(buffer),
			},
			observe: true,
		});
		expect(existsSync(testFilePath)).to.be.false;
		adapter.set(new Uint8Array([1, 2, 3]));
		expect(existsSync(testFilePath)).to.be.true;
		adapter.clear();
		expect(existsSync(testFilePath)).to.be.false;
		expect(adapter.get()).to.be.undefined;

		adapter.unobserve();
	});
	it('tests asynchronous clear on filesystem', async () => {
		const adapter = FileStorageAdapters.async<Uint8Array>(testFilePath, {
			serde: {
				serialize: (content) => Buffer.from(content),
				deserialize: (buffer) => new Uint8Array(buffer),
			},
			observe: true,
		});
		expect(existsSync(testFilePath)).to.be.false;
		await adapter.set(new Uint8Array([1, 2, 3]));
		expect(existsSync(testFilePath)).to.be.true;
		await adapter.clear();
		expect(existsSync(testFilePath)).to.be.false;
		expect(await adapter.get()).to.be.undefined;

		adapter.unobserve();
	});

	it('tests synchronous change detection on filesystem', async () => {
		const adapter = FileStorageAdapters.sync<Uint8Array>(testFilePath, {
			serde: {
				serialize: (content) => Buffer.from(content),
				deserialize: (buffer) => new Uint8Array(buffer),
			},
			observe: true,
		});
		adapter.set(new Uint8Array([1, 2, 3]));
		expect(existsSync(testFilePath)).to.be.true;
		let changesDetected = 0;
		adapter.change$.subscribeOnce(() => changesDetected++);
		writeFileSync(testFilePath, new Uint8Array([4, 5, 6]));
		await new Promise((res) => setTimeout(res, 100));
		expect(changesDetected).to.eq(1);
		adapter.unobserve();
		writeFileSync(testFilePath, new Uint8Array([7, 8, 9]));
		await new Promise((res) => setTimeout(res, 100));
		expect(changesDetected).to.eq(1);
	});
	it('tests asynchronous change detection on filesystem', async () => {
		const adapter = FileStorageAdapters.async<Uint8Array>(testFilePath, {
			serde: {
				serialize: (content) => Buffer.from(content),
				deserialize: (buffer) => new Uint8Array(buffer),
			},
			observe: true,
		});
		await adapter.set(new Uint8Array([1, 2, 3]));
		expect(existsSync(testFilePath)).to.be.true;
		let changesDetected = 0;
		adapter.change$.subscribeOnce(() => changesDetected++);
		writeFileSync(testFilePath, new Uint8Array([4, 5, 6]));
		await new Promise((res) => setTimeout(res, 100));
		expect(changesDetected).to.eq(1);
		adapter.unobserve();
		writeFileSync(testFilePath, new Uint8Array([7, 8, 9]));
		await new Promise((res) => setTimeout(res, 100));
		expect(changesDetected).to.eq(1);
	});

	it('tests synchronous R/W on filesystem with JSON', () => {
		const adapter = FileStorageAdapters.jsonSync<{
			a: number;
			b: string;
			sync: true;
		}>(testFilePath, {
			observe: true,
		});
		expect(existsSync(testFilePath)).to.be.false;
		expect(adapter.get()).to.be.undefined;
		expect(existsSync(testFilePath)).to.be.false;
		adapter.set({a: 1, b: 'hello', sync: true});
		expect(existsSync(testFilePath)).to.be.true;
		expect(readFileSync(testFilePath).toString()).to.eqls(
			JSON.stringify({a: 1, b: 'hello', sync: true}),
		);
		expect(adapter.get()).to.eqls({a: 1, b: 'hello', sync: true});
		adapter.unobserve();
	});
	it('tests asynchronous R/W on filesystem with JSON', async () => {
		const adapter = FileStorageAdapters.jsonAsync<{
			a: number;
			b: string;
			async: true;
		}>(testFilePath, {
			observe: true,
		});
		expect(existsSync(testFilePath)).to.be.false;
		expect(await adapter.get()).to.be.undefined;
		expect(existsSync(testFilePath)).to.be.false;
		await adapter.set({a: 1, b: 'hello', async: true});
		expect(existsSync(testFilePath)).to.be.true;
		expect(readFileSync(testFilePath).toString()).to.eqls(
			JSON.stringify({a: 1, b: 'hello', async: true}),
		);
		expect(await adapter.get()).to.eqls({a: 1, b: 'hello', async: true});
		adapter.unobserve();
	});

	it('tests synchronous R/W on filesystem with text', () => {
		const adapter = FileStorageAdapters.textSync(testFilePath, {
			observe: true,
		});
		expect(existsSync(testFilePath)).to.be.false;
		expect(adapter.get()).to.be.undefined;
		expect(existsSync(testFilePath)).to.be.false;
		adapter.set('hello, world! (sync)');
		expect(existsSync(testFilePath)).to.be.true;
		expect(readFileSync(testFilePath).toString()).to.eqls(
			'hello, world! (sync)',
		);
		expect(adapter.get()).to.eqls('hello, world! (sync)');
		adapter.unobserve();
	});
	it('tests asynchronous R/W on filesystem with text', async () => {
		const adapter = FileStorageAdapters.textAsync(testFilePath, {
			observe: true,
		});
		expect(existsSync(testFilePath)).to.be.false;
		expect(await adapter.get()).to.be.undefined;
		expect(existsSync(testFilePath)).to.be.false;
		await adapter.set('hello, world! (async)');
		expect(existsSync(testFilePath)).to.be.true;
		expect(readFileSync(testFilePath).toString()).to.eqls(
			'hello, world! (async)',
		);
		expect(await adapter.get()).to.eqls('hello, world! (async)');
		adapter.unobserve();
	});
});

describe('file adapter (unobserve variant)', () => {
	const testFilePath = join('tmp', 'test-unobserve.bin');
	beforeEach(() => {
		if (existsSync(testFilePath)) {
			rmSync(testFilePath);
		}
	});
	it('tests synchronous R/W on filesystem', () => {
		const adapter = FileStorageAdapters.sync<Uint8Array>(testFilePath, {
			serde: {
				serialize: (content) => Buffer.from(content),
				deserialize: (buffer) => new Uint8Array(buffer),
			},
		});
		expect(existsSync(testFilePath)).to.be.false;
		expect(adapter.get()).to.be.undefined;
		expect(existsSync(testFilePath)).to.be.false;
		adapter.set(new Uint8Array([1, 2, 3]));
		expect(existsSync(testFilePath)).to.be.true;
		expect(new Uint8Array(readFileSync(testFilePath))).to.eqls(
			new Uint8Array([1, 2, 3]),
		);
		expect(adapter.get()).to.eqls(new Uint8Array([1, 2, 3]));
	});
	it('tests asynchronous R/W on filesystem', async () => {
		const adapter = FileStorageAdapters.async<Uint8Array>(testFilePath, {
			serde: {
				serialize: (content) => Buffer.from(content),
				deserialize: (buffer) => Promise.resolve(new Uint8Array(buffer)),
			},
			observe: false,
		});
		expect(existsSync(testFilePath)).to.be.false;
		expect(await adapter.get()).to.be.undefined;
		expect(existsSync(testFilePath)).to.be.false;
		await adapter.set(new Uint8Array([1, 2, 3]));
		expect(existsSync(testFilePath)).to.be.true;
		expect(new Uint8Array(readFileSync(testFilePath))).to.eqls(
			new Uint8Array([1, 2, 3]),
		);
		expect(await adapter.get()).to.eqls(new Uint8Array([1, 2, 3]));
	});

	it('tests synchronous clear on filesystem', () => {
		const adapter = FileStorageAdapters.sync<Uint8Array>(testFilePath, {
			serde: {
				serialize: (content) => Buffer.from(content),
				deserialize: (buffer) => new Uint8Array(buffer),
			},
		});
		expect(existsSync(testFilePath)).to.be.false;
		adapter.set(new Uint8Array([1, 2, 3]));
		expect(existsSync(testFilePath)).to.be.true;
		adapter.clear();
		expect(existsSync(testFilePath)).to.be.false;
	});
	it('tests asynchronous clear on filesystem', async () => {
		const adapter = FileStorageAdapters.async<Uint8Array>(testFilePath, {
			serde: {
				serialize: (content) => Buffer.from(content),
				deserialize: (buffer) => new Uint8Array(buffer),
			},
		});
		expect(existsSync(testFilePath)).to.be.false;
		await adapter.set(new Uint8Array([1, 2, 3]));
		expect(existsSync(testFilePath)).to.be.true;
		await adapter.clear();
		expect(existsSync(testFilePath)).to.be.false;
	});

	it('tests synchronous R/W on filesystem with JSON', () => {
		const adapter = FileStorageAdapters.jsonSync<{
			a: number;
			b: string;
			sync: true;
		}>(testFilePath);
		expect(existsSync(testFilePath)).to.be.false;
		expect(adapter.get()).to.be.undefined;
		expect(existsSync(testFilePath)).to.be.false;
		adapter.set({a: 1, b: 'hello', sync: true});
		expect(existsSync(testFilePath)).to.be.true;
		expect(readFileSync(testFilePath).toString()).to.eqls(
			JSON.stringify({a: 1, b: 'hello', sync: true}),
		);
		expect(adapter.get()).to.eqls({a: 1, b: 'hello', sync: true});
	});
	it('tests asynchronous R/W on filesystem with JSON', async () => {
		const adapter = FileStorageAdapters.jsonAsync<{
			a: number;
			b: string;
			async: true;
		}>(testFilePath, {observe: false});
		expect(existsSync(testFilePath)).to.be.false;
		expect(await adapter.get()).to.be.undefined;
		expect(existsSync(testFilePath)).to.be.false;
		await adapter.set({a: 1, b: 'hello', async: true});
		expect(existsSync(testFilePath)).to.be.true;
		expect(readFileSync(testFilePath).toString()).to.eqls(
			JSON.stringify({a: 1, b: 'hello', async: true}),
		);
		expect(await adapter.get()).to.eqls({a: 1, b: 'hello', async: true});
	});

	it('tests synchronous R/W on filesystem with text', () => {
		const adapter = FileStorageAdapters.textSync(testFilePath);
		expect(existsSync(testFilePath)).to.be.false;
		expect(adapter.get()).to.be.undefined;
		expect(existsSync(testFilePath)).to.be.false;
		adapter.set('hello, world! (sync)');
		expect(existsSync(testFilePath)).to.be.true;
		expect(readFileSync(testFilePath).toString()).to.eqls(
			'hello, world! (sync)',
		);
		expect(adapter.get()).to.eqls('hello, world! (sync)');
	});
	it('tests asynchronous R/W on filesystem with text', async () => {
		const adapter = FileStorageAdapters.textAsync(testFilePath);
		expect(existsSync(testFilePath)).to.be.false;
		expect(await adapter.get()).to.be.undefined;
		expect(existsSync(testFilePath)).to.be.false;
		await adapter.set('hello, world! (async)');
		expect(existsSync(testFilePath)).to.be.true;
		expect(readFileSync(testFilePath).toString()).to.eqls(
			'hello, world! (async)',
		);
		expect(await adapter.get()).to.eqls('hello, world! (async)');
	});
});
