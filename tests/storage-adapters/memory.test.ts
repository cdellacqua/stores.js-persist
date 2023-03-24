import {expect} from 'chai';
import {InMemoryStorageAdapters} from '../../src/lib';

describe('memory adapter', () => {
	it('tests synchronous R/W on memory', () => {
		const adapter = InMemoryStorageAdapters.sync<Uint8Array>();
		expect(adapter.get()).to.be.undefined;
		adapter.set(new Uint8Array([1, 2, 3]));
		expect(adapter.get()).to.eqls(new Uint8Array([1, 2, 3]));
	});
	it('tests asynchronous R/W on memory', async () => {
		const adapter = InMemoryStorageAdapters.async<Uint8Array>();
		expect(await adapter.get()).to.be.undefined;
		await adapter.set(new Uint8Array([1, 2, 3]));
		expect(await adapter.get()).to.eqls(new Uint8Array([1, 2, 3]));
	});

	it('tests synchronous clear on memory', () => {
		const adapter = InMemoryStorageAdapters.sync<Uint8Array>();
		adapter.set(new Uint8Array([1, 2, 3]));
		adapter.clear();
		expect(adapter.get()).to.be.undefined;
	});
	it('tests asynchronous clear on memory', async () => {
		const adapter = InMemoryStorageAdapters.async<Uint8Array>();
		await adapter.set(new Uint8Array([1, 2, 3]));
		await adapter.clear();
		expect(await adapter.get()).to.be.undefined;
	});
	it('fails asynchronous R/W on memory due to abort controller', async () => {
		const adapter = InMemoryStorageAdapters.async<Uint8Array>();
		const abortController = new AbortController();
		abortController.abort();
		expect(await adapter.get(abortController).catch(() => 'fail')).to.eqls(
			'fail',
		);
		expect(
			await adapter.set(new Uint8Array(), abortController).catch(() => 'fail'),
		).to.eqls('fail');
		expect(await adapter.clear(abortController).catch(() => 'fail')).to.eqls(
			'fail',
		);
	});
});
