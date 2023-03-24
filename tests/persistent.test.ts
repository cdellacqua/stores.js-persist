import {makeSignal} from '@cdellacqua/signals';
import {expect} from 'chai';
import {InMemoryStorageAdapters, makePersistentStore} from '../src/lib';

describe('persistent store', () => {
	it('persists the initial value', () => {
		const storage = InMemoryStorageAdapters.sync();
		const store$ = makePersistentStore(1, {
			storage,
		});
		expect(store$.content()).to.eqls(1);
		store$.persist();
		expect(storage.get()).to.eqls(1);
	});
	it('retrieve a previously persisted initial value', () => {
		const storage = InMemoryStorageAdapters.sync(2);
		const store$ = makePersistentStore(1, {
			storage,
		});
		store$.fetch();
		expect(store$.content()).to.eqls(2);
		expect(storage.get()).to.eqls(2);
	});
	it('persists some values in memory', () => {
		const storage = InMemoryStorageAdapters.sync();
		const store$ = makePersistentStore(1, {
			storage,
		});
		expect(store$.content()).to.eqls(1);
		expect(storage.get()).to.be.undefined;
		store$.set(2);
		expect(store$.content()).to.eqls(2);
		expect(storage.get()).to.eqls(2);
	});
	it('persists some values in memory using an init function', () => {
		const storage = InMemoryStorageAdapters.sync();
		const store$ = makePersistentStore(undefined, {
			storage,
			start(set) {
				set(1);
			},
		});
		expect(storage.get()).to.eqls(undefined);
		expect(store$.content()).to.eqls(1);
		expect(storage.get()).to.eqls(1);
	});
	it('fails to retrieve a valid value from memory', () => {
		let getAttempts = 0;
		let memoryContent: number | undefined;
		const store$ = makePersistentStore(1, {
			storage: {
				get() {
					getAttempts++;
					if (getAttempts === 1) {
						throw new Error();
					} else {
						return memoryContent;
					}
				},
				set(v) {
					memoryContent = v;
				},
				clear() {
					memoryContent = undefined;
				},
			},
		});
		expect(store$.content()).to.eqls(1);
	});
	it('supports subscriptions', () => {
		const store$ = makePersistentStore(1, {
			storage: InMemoryStorageAdapters.sync(),
		});
		let actual: number | undefined;
		store$.subscribe((v) => (actual = v));
		expect(actual).to.eqls(1);
	});
	it('updates the content', () => {
		const storage = InMemoryStorageAdapters.sync<number>();
		const store$ = makePersistentStore(1, {
			storage,
		});
		store$.update((v) => v + 1);
		expect(store$.content()).to.eqls(2);
		expect(storage.get()).to.eqls(2);
	});
	it('detect changes', () => {
		let content: number | undefined;
		const change$ = makeSignal<number>();
		const store$ = makePersistentStore(1, {
			storage: {
				get() {
					return content;
				},
				set(value) {
					content = value;
				},
				change$,
				clear() {
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
	it('uses the cache before persisting', () => {
		const storage = InMemoryStorageAdapters.sync();
		const store$ = makePersistentStore(1, {
			storage,
		});
		expect(store$.content()).to.eqls(1);
		expect(storage.get()).to.be.undefined;
		store$.setCache(2);
		expect(storage.get()).to.be.undefined;
		store$.persist();
		expect(storage.get()).to.eqls(2);
	});
});
