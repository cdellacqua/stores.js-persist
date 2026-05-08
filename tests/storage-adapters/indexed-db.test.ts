import 'fake-indexeddb/auto';
import {IDBFactory} from 'fake-indexeddb';
import {IndexedDBStorageAdapters} from '../../src/lib/index.js';

describe('indexed-db adapter (without IndexedDB)', () => {
	let originalIndexedDB: unknown;
	beforeAll(() => {
		originalIndexedDB = (globalThis as {indexedDB?: IDBFactory}).indexedDB;
		(globalThis as {indexedDB?: IDBFactory}).indexedDB = undefined as unknown as IDBFactory;
	});
	afterAll(() => {
		(globalThis as {indexedDB?: unknown}).indexedDB = originalIndexedDB;
	});
	it('falls back to in-memory storage when indexedDB is unavailable', async () => {
		const adapter = IndexedDBStorageAdapters.async<{a: number}>('key', {
			dbName: 'fallback',
		});
		expect(await adapter.get()).to.be.undefined;
		await adapter.set({a: 1});
		expect(await adapter.get()).to.eqls({a: 1});
		await adapter.clear();
		expect(await adapter.get()).to.be.undefined;
	});
	it('falls back to a no-op observable in-memory storage when indexedDB is unavailable', async () => {
		const adapter = IndexedDBStorageAdapters.async<{a: number}>('key', {
			dbName: 'fallback',
			observe: true,
		});
		expect(await adapter.get()).to.be.undefined;
		await adapter.set({a: 1});
		expect(await adapter.get()).to.eqls({a: 1});
		let changes = 0;
		adapter.change$.subscribe(() => changes++);
		await adapter.set({a: 2});
		expect(changes).to.eq(0);
		adapter.unobserve();
	});
});

describe('indexed-db adapter', () => {
	beforeEach(() => {
		// fresh database per test to avoid cross-test pollution
		(globalThis as {indexedDB: IDBFactory}).indexedDB = new IDBFactory();
	});

	it('reads, writes and clears a record', async () => {
		const adapter = IndexedDBStorageAdapters.async<{
			a: number;
			b: string;
		}>('item', {dbName: 'test-db'});
		expect(await adapter.get()).to.be.undefined;
		await adapter.set({a: 1, b: 'hello'});
		expect(await adapter.get()).to.eqls({a: 1, b: 'hello'});
		await adapter.clear();
		expect(await adapter.get()).to.be.undefined;
	});

	it('persists structured-cloneable values without serialization loss', async () => {
		const adapter = IndexedDBStorageAdapters.async<{
			when: Date;
			payload: Uint8Array;
		}>('cloneable', {dbName: 'test-db'});
		const date = new Date('2024-01-02T03:04:05.000Z');
		const payload = new Uint8Array([1, 2, 3]);
		await adapter.set({when: date, payload});
		const read = await adapter.get();
		expect(read?.when).to.be.instanceOf(Date);
		expect(read?.when.toISOString()).to.eq(date.toISOString());
		expect(read?.payload).to.eqls(payload);
	});

	it('uses a custom serde when provided', async () => {
		const adapter = IndexedDBStorageAdapters.async<Date, string>('serde', {
			dbName: 'test-db',
			serde: {
				serialize: (d) => d.toISOString(),
				deserialize: (s) => new Date(s),
			},
		});
		const date = new Date('2024-05-06T07:08:09.000Z');
		await adapter.set(date);
		const read = await adapter.get();
		expect(read).to.be.instanceOf(Date);
		expect(read?.toISOString()).to.eq(date.toISOString());
	});

	it('isolates records by key within the same object store', async () => {
		const a = IndexedDBStorageAdapters.async<number>('a', {dbName: 'test-db'});
		const b = IndexedDBStorageAdapters.async<number>('b', {dbName: 'test-db'});
		await a.set(1);
		await b.set(2);
		expect(await a.get()).to.eq(1);
		expect(await b.get()).to.eq(2);
		await a.clear();
		expect(await a.get()).to.be.undefined;
		expect(await b.get()).to.eq(2);
	});

	it('isolates records across distinct object stores', async () => {
		const a = IndexedDBStorageAdapters.async<number>('shared', {
			dbName: 'test-db',
			storeName: 'storeA',
		});
		const b = IndexedDBStorageAdapters.async<number>('shared', {
			dbName: 'test-db',
			storeName: 'storeB',
		});
		await a.set(10);
		await b.set(20);
		expect(await a.get()).to.eq(10);
		expect(await b.get()).to.eq(20);
	});

	it('rejects when the abort signal is already aborted', async () => {
		const adapter = IndexedDBStorageAdapters.async<number>('aborted', {
			dbName: 'test-db',
		});
		const abortController = new AbortController();
		abortController.abort();
		expect(await adapter.get({signal: abortController.signal}).catch(() => 'fail')).to.eq('fail');
		expect(await adapter.set(1, {signal: abortController.signal}).catch(() => 'fail')).to.eq('fail');
		expect(await adapter.clear({signal: abortController.signal}).catch(() => 'fail')).to.eq('fail');
	});

	it('exposes change$ and unobserve when observe is true', async () => {
		const writer = IndexedDBStorageAdapters.async<{n: number}>('observed', {
			dbName: 'observe-db',
		});
		const observer = IndexedDBStorageAdapters.async<{n: number}>('observed', {
			dbName: 'observe-db',
			observe: true,
		});
		let changes = 0;
		let lastValue: {n: number} | undefined;
		observer.change$.subscribe((value) => {
			changes++;
			lastValue = value;
		});
		await writer.set({n: 1});
		// give the BroadcastChannel a tick to deliver and the async re-read to complete
		await new Promise((res) => setTimeout(res, 50));
		expect(changes).to.eq(1);
		expect(lastValue).to.eqls({n: 1});

		observer.unobserve();
		await writer.set({n: 2});
		await new Promise((res) => setTimeout(res, 50));
		expect(changes).to.eq(1);
	});

	it('handles concurrent writes across adapters sharing dbName/storeName', async () => {
		const a = IndexedDBStorageAdapters.async<number>('a', {
			dbName: 'concurrent-db',
		});
		const b = IndexedDBStorageAdapters.async<number>('b', {
			dbName: 'concurrent-db',
		});
		await Promise.all([a.set(1), b.set(2), a.set(10), b.set(20), a.set(100), b.set(200)]);
		expect(await a.get()).to.eq(100);
		expect(await b.get()).to.eq(200);
	});

	it('handles concurrent reads and writes across adapters sharing dbName/storeName', async () => {
		const a = IndexedDBStorageAdapters.async<number>('a', {
			dbName: 'concurrent-rw-db',
		});
		const b = IndexedDBStorageAdapters.async<number>('b', {
			dbName: 'concurrent-rw-db',
		});
		await a.set(0);
		await b.set(0);
		const results = await Promise.all([a.set(1), b.get(), a.get(), b.set(2), a.get(), b.get()]);
		// Reads observe either the pre-set or post-set value (no corruption)
		expect(results[1]).to.satisfy((v: number) => v === 0 || v === 2);
		expect(results[2]).to.satisfy((v: number) => v === 0 || v === 1);
		expect(results[4]).to.satisfy((v: number) => v === 0 || v === 1);
		expect(results[5]).to.satisfy((v: number) => v === 0 || v === 2);
		expect(await a.get()).to.eq(1);
		expect(await b.get()).to.eq(2);
	});

	it('reopens A transparently after B triggers a versionchange', async () => {
		const a = IndexedDBStorageAdapters.async<number>('a', {
			dbName: 'versionchange-db',
			storeName: 'storeA',
		});
		await a.set(1);
		expect(await a.get()).to.eq(1);

		// Initializing B forces a v+1 upgrade because storeB doesn't exist yet,
		// which fires versionchange on A's cached connection and closes it.
		const b = IndexedDBStorageAdapters.async<number>('b', {
			dbName: 'versionchange-db',
			storeName: 'storeB',
		});
		await b.set(2);

		// A's cached connection was closed; subsequent ops should reopen the DB
		// transparently against the upgraded schema.
		expect(await a.get()).to.eq(1);
		await a.set(3);
		expect(await a.get()).to.eq(3);
		expect(await b.get()).to.eq(2);
	});

	it('does not corrupt state when B triggers a versionchange while A has an op in flight', async () => {
		const a = IndexedDBStorageAdapters.async<number>('a', {
			dbName: 'inflight-versionchange-db',
			storeName: 'storeA',
		});
		// Cache A's connection at v1.
		await a.set(1);

		const b = IndexedDBStorageAdapters.async<number>('b', {
			dbName: 'inflight-versionchange-db',
			storeName: 'storeB',
		});

		// Fire A's write and B's first write concurrently. B's first write
		// triggers the v+1 upgrade that closes A's cached connection. Depending
		// on microtask ordering A's transaction may either commit before the
		// connection closes or be invalidated mid-flight.
		const [aResult] = await Promise.allSettled([a.set(2), b.set(20)]);

		// Either outcome is acceptable, but A must be self-consistent afterwards
		// and recover for subsequent ops.
		const aValueAfter = await a.get();
		if (aResult.status === 'fulfilled') {
			expect(aValueAfter).to.eq(2);
		} else {
			expect(aValueAfter).to.eq(1);
		}
		await a.set(99);
		expect(await a.get()).to.eq(99);
		expect(await b.get()).to.eq(20);
	});
});
