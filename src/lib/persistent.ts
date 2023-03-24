import {makeStore, Setter, Store, Update} from 'universal-stores';
import {ItemStorage, ObservableItemStorage} from './storage-adapters/shared';

/**
 * A Persistent store that supports synchronous operations.
 */
export type PersistentStore<T> = Store<T> & {
	/** The underlying storage handler for this store. */
	storage: ItemStorage<T>;
	/**
	 * Set the content of the store without persisting it to the storage.
	 * @param v the new value of this store.
	 */
	setCache: Setter<T>;
	/**
	 * Set the content of the store through an update function without persisting it to the storage.
	 * @param updater the update function that will receive the current value and return the new one.
	 */
	updateCache: Update<T>;
	/** Manually fetch the content of the store by querying the storage. */
	fetch: () => T | undefined;
	/** Manually persist the current content of the store to the storage. */
	persist: () => void;
};

/**
 * Configuration object used to initialize the Persistent Store.
 */
export type PersistentStoreConfig<T> = {
	/**
	 * (optional) A start function that will be called once the store has at least one subscriber and optionally returns a stop function that will be called
	 * once the store has no remaining subscribers.
	 */
	start?: (set: (value: T) => void) => void | (() => void);
	/** The underlying storage handler for this store. */
	storage: ItemStorage<T> | ObservableItemStorage<T>;
};

/**
 * Create a Persistent Store. This store will be initialized with `defaultValue`
 *
 * Note: to fetch the most up-to-date content of the store, you should manually call `.fetch()` after the
 * store initialization. This is done to ensure that you can create your stores synchronously and fetch
 * the data lazily without unnecessarily blocking the main thread.
 *
 * @param defaultValue the value the store will contain upon initialization.
 * @param config the configuration object.
 * @param config.storage an ItemStorage implementation (e.g. WebStorageAdapters.local(key) or WebStorageAdapters.local(key)).
 * @param config.start (optional) a start function that will be called once the store has at least one subscriber and optionally returns a stop function that will be called
 *                     once the store has no remaining subscribers.
 * @param config.onInitFailure (optional, defaults to a function that prints the error in console and returns the initial value)
 *                             a function that gets called if the storage throws an error when retrieving the initial value of the store.
 */
export function makePersistentStore<T>(
	defaultValue: T,
	{storage, start}: PersistentStoreConfig<T>,
): PersistentStore<T> {
	const cache$ = makeStore<T>(
		defaultValue,
		start &&
			((set) => {
				return start((value) => {
					storage.set(value);
					set(value);
				});
			}),
	);

	if ('change$' in storage) {
		storage.change$.subscribe((externallyUpdatedValue) =>
			cache$.set(externallyUpdatedValue),
		);
	}

	return {
		storage,
		set: (v) => {
			storage.set(v);
			return cache$.set(v);
		},
		update: (updater) => {
			return cache$.update((oldValue) => {
				const newValue = updater(oldValue);
				storage.set(newValue);
				return newValue;
			});
		},
		fetch: () => {
			const fetched = storage.get();
			if (fetched !== undefined) {
				cache$.set(fetched);
			}
			return fetched;
		},
		persist: () => {
			storage.set(cache$.content());
		},
		setCache: cache$.set,
		updateCache: cache$.update,
		subscribe: (subscriber) => {
			return cache$.subscribe(subscriber);
		},
		nOfSubscriptions: cache$.nOfSubscriptions,
		content: cache$.content,
	};
}
