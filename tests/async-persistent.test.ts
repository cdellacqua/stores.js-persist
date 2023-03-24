import {makeSignal} from '@cdellacqua/signals';
import {expect} from 'chai';
import {InMemoryStorageAdapters, makeAsyncPersistentStore} from '../src/lib';

describe('async persistent store', () => {
	it('persists the initial value', async () => {
		const storage = InMemoryStorageAdapters.async();
		const store$ = makeAsyncPersistentStore(1, {
			storage,
		});
		expect(store$.content()).to.eqls(1);
		await store$.persist();
		expect(await storage.get()).to.eqls(1);
	});
	it('retrieve a previously persisted initial value', async () => {
		const storage = InMemoryStorageAdapters.async(2);
		const store$ = makeAsyncPersistentStore(1, {
			storage,
		});
		await store$.fetch();
		expect(store$.content()).to.eqls(2);
		expect(await storage.get()).to.eqls(2);
	});
	it('persists some values in memory', async () => {
		const storage = InMemoryStorageAdapters.async();
		const store$ = makeAsyncPersistentStore(1, {
			storage,
		});
		expect(store$.content()).to.eqls(1);
		await store$.persist();
		expect(await storage.get()).to.eqls(1);
		await store$.set(2);
		expect(store$.content()).to.eqls(2);
		expect(await storage.get()).to.eqls(2);
	});
	it('persists some values in memory using an init function', async () => {
		const storage = InMemoryStorageAdapters.async();
		const store$ = makeAsyncPersistentStore(undefined, {
			storage,
			start(set) {
				set(1).catch(console.warn);
			},
		});
		expect(await storage.get()).to.eqls(undefined);
		expect(store$.content()).to.be.undefined;
		await Promise.resolve();
		expect(store$.content()).to.eqls(1);
		expect(await storage.get()).to.eqls(1);
	});
	it('fails to retrieve a valid value from memory', async () => {
		let getAttempts = 0;
		let memoryContent: number | undefined;
		const store$ = makeAsyncPersistentStore(1, {
			storage: {
				async get() {
					getAttempts++;
					if (getAttempts === 1) {
						throw new Error();
					} else {
						return memoryContent;
					}
				},
				async set(v) {
					memoryContent = v;
				},
				async clear() {
					memoryContent = undefined;
				},
			},
		});
		expect(store$.content()).to.eqls(1);
	});
	it('fails to persist the initial value to memory', async () => {
		let memoryContent: number | undefined;
		const brokenStorage = {
			async get() {
				return memoryContent;
			},
			async set() {
				throw new Error();
			},
			async clear() {
				memoryContent = undefined;
			},
		};
		const store$ = makeAsyncPersistentStore(1, {
			storage: brokenStorage,
		});
		await store$.set(2).catch(() => undefined);
		expect(store$.content()).to.eqls(1);
	});
	it('manually fetches an up-to-date content', async () => {
		let memoryContent: number | undefined;
		const storage = {
			async get() {
				return memoryContent;
			},
			async set(v: number) {
				memoryContent = v;
			},
			async clear() {
				memoryContent = undefined;
			},
		};
		const store$ = makeAsyncPersistentStore(1, {
			storage,
		});
		expect(store$.content()).to.eqls(1);
		memoryContent = 10;
		expect(store$.content()).to.eqls(1);
		await store$.fetch();
		expect(store$.content()).to.eqls(10);
	});
	it('fails to fetch an up-to-date content', async () => {
		const storage = InMemoryStorageAdapters.async<number>();
		const store$ = makeAsyncPersistentStore(1, {
			storage,
		});
		expect(store$.content()).to.eqls(1);
		await storage.set(10);
		expect(store$.content()).to.eqls(1);
		const abortController = new AbortController();
		abortController.abort();
		await store$.fetch(abortController).catch(() => undefined);
		expect(store$.content()).to.eqls(1);
	});
	it('supports subscriptions', async () => {
		const store$ = makeAsyncPersistentStore(1, {
			storage: InMemoryStorageAdapters.async(),
		});
		let actual: number | undefined;
		store$.subscribe((v) => (actual = v));
		expect(actual).to.eqls(1);
	});
	it('updates the content', async () => {
		const storage = InMemoryStorageAdapters.async<number>();
		const store$ = makeAsyncPersistentStore(1, {
			storage,
		});
		await store$.update((v) => v + 1);
		expect(store$.content()).to.eqls(2);
		expect(await storage.get()).to.eqls(2);
	});
	it('detect changes', async () => {
		let content: number | undefined;
		const change$ = makeSignal<number>();
		const store$ = makeAsyncPersistentStore(1, {
			storage: {
				async get() {
					return content;
				},
				async set(value) {
					content = value;
				},
				change$,
				async clear() {
					content = undefined;
				},
				unobserve() {
					// ignore
				},
			},
		});
		expect(store$.content()).to.eqls(1);
		change$.emit(2);
		expect(store$.content()).to.eqls(2);
	});
	it('uses the cache before persisting', async () => {
		const storage = InMemoryStorageAdapters.async();
		const store$ = makeAsyncPersistentStore(1, {
			storage,
		});
		expect(store$.content()).to.eqls(1);
		expect(await storage.get()).to.be.undefined;
		store$.setCache(2);
		expect(await storage.get()).to.be.undefined;
		await store$.persist();
		expect(await storage.get()).to.eqls(2);
	});
});
