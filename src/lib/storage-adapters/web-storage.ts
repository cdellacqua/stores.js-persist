import {makeSignal} from '@cdellacqua/signals';
import {makeJSONSerde} from './serde/json-serde';
import {InMemoryStorageAdapters} from './memory';
import {Serde, ItemStorage, ObservableItemStorage} from './shared';

/**
 * Generate an ItemStorage based on an implementation of the native Storage API.
 * @param key key needed to access the record in the storage.
 * @param nativeStorage localStorage, sessionStorage or any other implementation of the Web Storage API.
 * @param options (optional) an object containing a serializer/deserializer and the observe flag.
 * @param options.observe if true listen for storage events to update and emit them to all subscribers of the change$ signal.
 * @param options.serde an object containing a serialize and deserialize function.
 * @param options.serde.serialize a function that converts T into a string.
 * @param options.serde.deserialize a function that converts a string into T.
 */
function nativeStorageAdapter<T>(
	key: string,
	nativeStorage: Storage | undefined,
	options: {
		serde: Serde<T, string>;
		observe: boolean;
	},
): ItemStorage<T> | ObservableItemStorage<T> {
	const observe = options.observe;

	if (!nativeStorage) {
		if (!observe) {
			return InMemoryStorageAdapters.sync();
		} else {
			return {
				...InMemoryStorageAdapters.sync(),
				change$: makeSignal(),
				unobserve: () => undefined,
			};
		}
	}

	const {serialize, deserialize} = options.serde;

	const storage: ItemStorage<T> = {
		clear: () => nativeStorage.removeItem(key),
		get: () => {
			const nativeStorageValue = nativeStorage.getItem(key);
			if (nativeStorageValue === null) {
				return undefined;
			}
			return deserialize(nativeStorageValue);
		},
		set: (value) => {
			nativeStorage.setItem(key, serialize(value));
		},
	};

	if (!observe) {
		return storage;
	} else {
		const change$ = makeSignal<T>();

		const handleChange = (e: StorageEvent) => {
			if (
				e.storageArea === nativeStorage &&
				e.key === key &&
				e.newValue !== null
			) {
				change$.emit(deserialize(e.newValue));
			}
		};

		// A storage event is only emitted when the change
		// is made in a window different from the current one,
		// e.g. the browser devtools, a child window or another tab.
		window.addEventListener('storage', handleChange);

		return {
			...storage,
			unobserve: () => {
				window.removeEventListener('storage', handleChange);
			},
			change$,
		};
	}
}

/**
 * Generate an ItemStorage based on the localStorage.
 * @param key the key in the localStorage Web Storage API.
 * @param options (optional) an object containing a serializer/deserializer and the observe flag.
 * @param options.observe (optional, defaults to false) if true listen for storage events to update and emit them to all subscribers of the change$ signal.
 * @param options.serde (optional) an object containing a serialize and deserialize function.
 * @param options.serde.serialize a function that converts T into a string.
 * @param options.serde.deserialize a function that converts a string into T.
 */
function local<T>(
	key: string,
	options: {
		serde?: Serde<T, string>;
		observe?: false;
	},
): ItemStorage<T>;
/**
 * Generate an ObservableItemStorage based on the localStorage.
 * @param key the key in the localStorage Web Storage API.
 * @param options (optional) an object containing a serializer and the observe flag.
 * @param options.observe (optional, defaults to false) if true listen for storage events to update and emit them to all subscribers of the change$ signal.
 * @param options.serde (optional) an object containing a serialize and deserialize function.
 * @param options.serde.serialize a function that converts T into a string.
 * @param options.serde.deserialize a function that converts a string into T.
 */
function local<T>(
	key: string,
	options?: {
		serde?: Serde<T, string>;
		observe: true;
	},
): ObservableItemStorage<T>;
/**
 * Generate an ItemStorage or an ObservableItemStorage based on the localStorage.
 * @param key the key in the localStorage Web Storage API.
 * @param options (optional) an object containing a serializer and the observe flag.
 * @param options.observe (optional, defaults to false) if true listen for storage events to update and emit them to all subscribers of the change$ signal.
 * @param options.serde (optional) an object containing a serialize and deserialize function.
 * @param options.serde.serialize a function that converts T into a string.
 * @param options.serde.deserialize a function that converts a string into T.
 */
function local<T>(
	key: string,
	options?: {
		serde?: Serde<T, string>;
		observe?: boolean;
	},
): ItemStorage<T> | ObservableItemStorage<T>;

function local<T>(
	key: string,
	options?: {
		serde?: Serde<T, string>;
		observe?: boolean;
	},
): ItemStorage<T> | ObservableItemStorage<T> {
	const observe = options?.observe ?? false;

	return nativeStorageAdapter(
		key,
		typeof localStorage !== 'undefined' ? localStorage : undefined,
		{
			serde: options?.serde ?? makeJSONSerde(),
			observe,
		},
	);
}

/**
 * Generate an ItemStorage based on the sessionStorage.
 * @param key the key in the sessionStorage Web Storage API.
 * @param options (optional) an object containing a serializer/deserializer and the observe flag.
 * @param options.observe (optional, defaults to false) if true listen for storage events to update and emit them to all subscribers of the change$ signal.
 * @param options.serde (optional) an object containing a serialize and deserialize function.
 * @param options.serde.serialize a function that converts T into a string.
 * @param options.serde.deserialize a function that converts a string into T.
 */
function session<T>(
	key: string,
	options: {
		serde?: Serde<T, string>;
		observe?: false;
	},
): ItemStorage<T>;
/**
 * Generate an ItemStorage based on the sessionStorage.
 * @param key the key in the sessionStorage Web Storage API.
 * @param options (optional) an object containing a serializer/deserializer and the observe flag.
 * @param options.observe (optional, defaults to false) if true listen for storage events to update and emit them to all subscribers of the change$ signal.
 * @param options.serde (optional) an object containing a serialize and deserialize function.
 * @param options.serde.serialize a function that converts T into a string.
 * @param options.serde.deserialize a function that converts a string into T.
 */
function session<T>(
	key: string,
	options?: {
		serde?: Serde<T, string>;
		observe: true;
	},
): ObservableItemStorage<T>;
/**
 * Generate an ItemStorage based on the sessionStorage.
 * @param key the key in the sessionStorage Web Storage API.
 * @param options (optional) an object containing a serializer/deserializer and the observe flag.
 * @param options.observe (optional, defaults to false) if true listen for storage events to update and emit them to all subscribers of the change$ signal.
 * @param options.serde (optional) an object containing a serialize and deserialize function.
 * @param options.serde.serialize a function that converts T into a string.
 * @param options.serde.deserialize a function that converts a string into T.
 */
function session<T>(
	key: string,
	options?: {
		serde?: Serde<T, string>;
		observe?: boolean;
	},
): ItemStorage<T> | ObservableItemStorage<T>;

function session<T>(
	key: string,
	options?: {
		serde?: Serde<T, string>;
		observe?: boolean;
	},
): ItemStorage<T> | ObservableItemStorage<T> {
	const observe = options?.observe ?? false;

	return nativeStorageAdapter(
		key,
		typeof sessionStorage !== 'undefined' ? sessionStorage : undefined,
		{
			serde: options?.serde ?? makeJSONSerde(),
			observe,
		},
	);
}

export const WebStorageAdapters = {local, session};
