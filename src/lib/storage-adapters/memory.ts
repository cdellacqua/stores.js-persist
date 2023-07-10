import {AsyncItemStorage, ItemStorage} from './shared';

/**
 * Generate an in-memory ItemStorage. This adapter is not very useful per se, but
 * it can be used for testing purposes and for mixed SSR-CSR scenarios when
 * the server is prerendering content by running the same code as the client (e.g. Next.js, SvelteKit).
 */
function sync<T>(defaultValue?: T | undefined): ItemStorage<T> {
	let currentValue = defaultValue;
	return {
		clear: () => {
			currentValue = undefined;
		},
		get: () => currentValue,
		set: (v) => {
			currentValue = v;
		},
	};
}

/**
 * Generate an in-memory AsyncItemStorage. This adapter is not very useful per se, but
 * it can be used for testing purposes and for mixed SSR-CSR scenarios when
 * the server is prerendering content by running the same code as the client (e.g. Next.js, SvelteKit).
 */
function async<T>(defaultValue?: T | undefined): AsyncItemStorage<T> {
	let currentValue = defaultValue;
	return {
		clear: async (opts) => {
			opts?.signal?.throwIfAborted();
			currentValue = undefined;
		},
		get: async (opts) => {
			opts?.signal?.throwIfAborted();
			return currentValue;
		},
		set: async (v, opts) => {
			opts?.signal?.throwIfAborted();
			currentValue = v;
		},
	};
}

export const InMemoryStorageAdapters = {
	sync,
	async,
};
