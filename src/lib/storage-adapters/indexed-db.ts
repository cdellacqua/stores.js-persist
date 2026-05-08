import {makeSignal} from '@cdellacqua/signals';
import {InMemoryStorageAdapters} from './memory.js';
import {AsyncItemStorage, AsyncSerde, ObservableAsyncItemStorage} from './shared.js';

const DEFAULT_STORE_NAME = 'kv';

function openDatabase(dbName: string, storeName: string): Promise<IDBDatabase> {
	const open = (version?: number) =>
		new Promise<IDBDatabase>((resolve, reject) => {
			const request = indexedDB.open(dbName, version);
			request.onupgradeneeded = () => {
				const db = request.result;
				if (!db.objectStoreNames.contains(storeName)) {
					db.createObjectStore(storeName);
				}
			};
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);
			request.onblocked = () => reject(new Error(`indexedDB "${dbName}" upgrade is blocked`));
		});

	return open().then((db) => {
		if (db.objectStoreNames.contains(storeName)) {
			return db;
		}
		// The DB exists but doesn't have our object store yet: bump the version
		// to trigger an upgrade.
		const newVersion = db.version + 1;
		db.close();
		return open(newVersion);
	});
}

function awaitRequest<T>(req: IDBRequest<T>, signal?: AbortSignal): Promise<T> {
	return new Promise<T>((resolve, reject) => {
		if (signal?.aborted) {
			reject(signal.reason);
			return;
		}
		const cleanup = () => {
			signal?.removeEventListener('abort', onAbort);
		};
		const onAbort = () => {
			cleanup();
			try {
				req.transaction?.abort();
			} catch {
				// transaction may already have finished
			}
			reject(signal?.reason);
		};
		signal?.addEventListener('abort', onAbort);
		req.onsuccess = () => {
			cleanup();
			resolve(req.result);
		};
		req.onerror = () => {
			cleanup();
			reject(req.error);
		};
	});
}

/**
 * Generate an AsyncItemStorage backed by IndexedDB.
 * @param key the IDBValidKey identifying the record within the object store.
 * @param options configuration object.
 * @param options.dbName the name of the IndexedDB database.
 * @param options.storeName (optional, defaults to "kv") the name of the object store within the database.
 * @param options.serde (optional, defaults to an identity serde) an AsyncSerde used to convert T to/from a structured-cloneable value.
 * @param options.observe (optional, defaults to false) if true, listen for cross-context BroadcastChannel messages and emit them to all subscribers of the change$ signal.
 */
function async<T, TSerialized = T>(
	key: IDBValidKey,
	options: {
		dbName: string;
		storeName?: string;
		serde?: AsyncSerde<T, TSerialized>;
		observe: true;
	},
): ObservableAsyncItemStorage<T>;
/**
 * Generate an AsyncItemStorage backed by IndexedDB.
 * @param key the IDBValidKey identifying the record within the object store.
 * @param options configuration object.
 * @param options.dbName the name of the IndexedDB database.
 * @param options.storeName (optional, defaults to "kv") the name of the object store within the database.
 * @param options.serde (optional, defaults to an identity serde) an AsyncSerde used to convert T to/from a structured-cloneable value.
 * @param options.observe (optional, defaults to false) if true, listen for cross-context BroadcastChannel messages and emit them to all subscribers of the change$ signal.
 */
function async<T, TSerialized = T>(
	key: IDBValidKey,
	options: {
		dbName: string;
		storeName?: string;
		serde?: AsyncSerde<T, TSerialized>;
		observe?: false;
	},
): AsyncItemStorage<T>;
/**
 * Generate an AsyncItemStorage or ObservableAsyncItemStorage backed by IndexedDB.
 * @param key the IDBValidKey identifying the record within the object store.
 * @param options configuration object.
 * @param options.dbName the name of the IndexedDB database.
 * @param options.storeName (optional, defaults to "kv") the name of the object store within the database.
 * @param options.serde (optional, defaults to an identity serde) an AsyncSerde used to convert T to/from a structured-cloneable value.
 * @param options.observe (optional, defaults to false) if true, listen for cross-context BroadcastChannel messages and emit them to all subscribers of the change$ signal.
 */
function async<T, TSerialized = T>(
	key: IDBValidKey,
	options: {
		dbName: string;
		storeName?: string;
		serde?: AsyncSerde<T, TSerialized>;
		observe?: boolean;
	},
): AsyncItemStorage<T> | ObservableAsyncItemStorage<T>;

function async<T, TSerialized = T>(
	key: IDBValidKey,
	options: {
		dbName: string;
		storeName?: string;
		serde?: AsyncSerde<T, TSerialized>;
		observe?: boolean;
	},
): AsyncItemStorage<T> | ObservableAsyncItemStorage<T> {
	const observe = options.observe ?? false;

	if (typeof indexedDB === 'undefined') {
		if (!observe) {
			return InMemoryStorageAdapters.async<T>();
		}
		return {
			...InMemoryStorageAdapters.async<T>(),
			change$: makeSignal<T>(),
			unobserve: () => undefined,
		};
	}

	const storeName = options.storeName ?? DEFAULT_STORE_NAME;
	const serde =
		options.serde ??
		({
			serialize: (v: T) => v,
			deserialize: (v: T) => v,
		} as unknown as AsyncSerde<T, TSerialized>);

	let dbPromise: Promise<IDBDatabase> | undefined;
	const getDB = () => {
		if (!dbPromise) {
			const promise = openDatabase(options.dbName, storeName)
				.then((db) => {
					// Allow other tabs/adapters to upgrade the DB by closing this
					// connection when a versionchange occurs. A subsequent op will
					// re-open the DB with the new schema.
					db.onversionchange = () => {
						db.close();
						if (dbPromise === promise) {
							dbPromise = undefined;
						}
					};
					return db;
				})
				.catch((err) => {
					if (dbPromise === promise) {
						dbPromise = undefined;
					}
					throw err;
				});
			dbPromise = promise;
		}
		return dbPromise;
	};

	const channelName = `stores.js-persist:${options.dbName}:${storeName}:${String(key)}`;
	let channel: BroadcastChannel | undefined = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel(channelName) : undefined;

	const get = async (getOpts?: {signal?: AbortSignal}) => {
		getOpts?.signal?.throwIfAborted();
		const db = await getDB();
		getOpts?.signal?.throwIfAborted();
		const tx = db.transaction(storeName, 'readonly');
		const store = tx.objectStore(storeName);
		const raw = await awaitRequest<TSerialized | undefined>(store.get(key) as IDBRequest<TSerialized | undefined>, getOpts?.signal);
		if (raw === undefined) {
			return undefined;
		}
		return serde.deserialize(raw);
	};

	const baseStorage: AsyncItemStorage<T> = {
		get,
		set: async (value, setOpts) => {
			setOpts?.signal?.throwIfAborted();
			const serialized = await serde.serialize(value);
			setOpts?.signal?.throwIfAborted();
			const db = await getDB();
			setOpts?.signal?.throwIfAborted();
			const tx = db.transaction(storeName, 'readwrite');
			const store = tx.objectStore(storeName);
			await awaitRequest(store.put(serialized as unknown, key), setOpts?.signal);
			channel?.postMessage('change');
		},
		clear: async (clearOpts) => {
			clearOpts?.signal?.throwIfAborted();
			const db = await getDB();
			clearOpts?.signal?.throwIfAborted();
			const tx = db.transaction(storeName, 'readwrite');
			const store = tx.objectStore(storeName);
			await awaitRequest(store.delete(key), clearOpts?.signal);
			channel?.postMessage('change');
		},
	};

	if (!observe) {
		return baseStorage;
	}

	const change$ = makeSignal<T>();

	const handleMessage = () => {
		get()
			.then((value) => {
				if (value !== undefined) {
					change$.emit(value);
				}
			})
			.catch(() => {
				// swallow read errors triggered by external changes
			});
	};

	channel?.addEventListener('message', handleMessage);

	return {
		...baseStorage,
		change$,
		unobserve: () => {
			channel?.removeEventListener('message', handleMessage);
			channel?.close();
			channel = undefined;
		},
	};
}

export const IndexedDBStorageAdapters = {async};
