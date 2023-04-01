import {
	makeStore,
	ReadonlyStore,
	Setter,
	Store,
	Update,
	Updater,
} from 'universal-stores';
import {
	AsyncItemStorage,
	ObservableAsyncItemStorage,
} from './storage-adapters/shared';
import AsyncLock from 'async-lock';

/** Possible states of an AsyncPersistentStore. */
export type AsyncPersistentStoreState = 'ready' | 'persisting' | 'fetching';

export type AsyncSetter<T> = (
	v: T,
	options?: {signal?: AbortSignal},
) => Promise<void>;
export type AsyncUpdate<T> = (
	updater: Updater<T>,
	options?: {signal?: AbortSignal},
) => Promise<void>;

/**
 * A Persistent store that supports asynchronous operations.
 */
export type AsyncPersistentStore<T> = Omit<Store<T>, 'set' | 'update'> & {
	/**
	 * Asynchronously set the content of the store and persist it to the async storage.
	 * @param v the new value of this store.
	 */
	set: AsyncSetter<T>;
	/**
	 * Asynchronously set the new value of the store through an updater function and persist it to the async storage.
	 * @param updater the update function that will receive the current value and return the new one.
	 */
	update: AsyncUpdate<T>;
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
	/** A sub-store containing the current state of the main store ({@link AsyncPersistentStoreState}). */
	state$: ReadonlyStore<AsyncPersistentStoreState>;
	/** The underlying storage handler for this store. */
	storage: AsyncItemStorage<T>;
	/** Manually fetch the content of the store by querying the storage. */
	fetch: (options?: {signal?: AbortSignal}) => Promise<T | undefined>;
	/** Manually persist the current content of the store to the storage. */
	persist: (options?: {signal?: AbortSignal}) => Promise<void>;
};

export type AsyncPersistentStoreStartHandler<T> = (
	set: (value: T) => Promise<void>,
) => void | (() => void);

/**
 * Configuration object used to initialize the Persistent Store.
 */
export type AsyncPersistentStoreConfig<T> = {
	/** A storage. */
	storage: AsyncItemStorage<T> | ObservableAsyncItemStorage<T>;
	/**
	 * (optional) A start function that will be called once the store has at least one subscriber and optionally returns a stop function that will be called
	 * once the store has no remaining subscribers.
	 */
	start?: AsyncPersistentStoreStartHandler<T>;
	/**
	 * (optional, defaults to 100) The maximum number of async operations that can be enqueued before starting to reject.
	 */
	maxPendingOperations?: number;
};

/**
 * Create an AsyncPersistentStore. This store will be initialized with `defaultValue`.
 *
 * Note: to fetch the most up-to-date content of the store, you should manually call `.fetch()` after the
 * store initialization. This is done to ensure that you can create your stores synchronously and fetch
 * the data lazily.
 *
 * @param defaultValue the value the store will contain upon initialization.
 * @param config the configuration object.
 * @param config.storage an AsyncItemStorage implementation (e.g. FileStorageAdapters.textAsync(key)).
 * @param config.start (optional) a start function that will be called once the store has at least one subscriber and optionally returns a stop function that will be called
 *                     once the store has no remaining subscribers.
 */
export function makeAsyncPersistentStore<T>(
	defaultValue: T,
	{storage, start, maxPendingOperations}: AsyncPersistentStoreConfig<T>,
): AsyncPersistentStore<T> {
	const lock = new AsyncLock({maxPending: maxPendingOperations});
	const lockKey = 'lock';

	const state$ = makeStore<AsyncPersistentStoreState>('ready');

	const cache$ = makeStore<T>(
		defaultValue,
		start &&
			(() => {
				return start(queuedSet);
			}),
	);

	async function queuedSet(
		value: T,
		options?: {signal?: AbortSignal},
		shouldUpdateCache = true,
	) {
		await lock.acquire(lockKey, async () => {
			try {
				state$.set('persisting');
				await storage.set(value, options);
				if (shouldUpdateCache) {
					cache$.set(value);
				}
			} finally {
				state$.set('ready');
			}
		});
	}

	if ('change$' in storage) {
		storage.change$.subscribe((externallyUpdatedValue) =>
			cache$.set(externallyUpdatedValue),
		);
	}

	return {
		storage,
		persist: async (opts) => {
			await queuedSet(cache$.content(), opts, false);
		},
		fetch: async (options?: {signal?: AbortSignal}) => {
			return await lock.acquire(lockKey, async () => {
				try {
					state$.set('fetching');
					const fetched = await storage.get({signal: options?.signal});
					if (fetched !== undefined) {
						cache$.set(fetched);
					}
					return fetched;
				} finally {
					state$.set('ready');
				}
			});
		},
		set: queuedSet,
		update: (updater) => queuedSet(updater(cache$.content())),
		setCache: cache$.set,
		updateCache: cache$.update,
		subscribe: cache$.subscribe,
		nOfSubscriptions: cache$.nOfSubscriptions,
		content: cache$.content,
		state$,
	};
}
