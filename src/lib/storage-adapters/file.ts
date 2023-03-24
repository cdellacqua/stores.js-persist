import {
	AsyncItemStorage,
	ItemStorage,
	Serde,
	AsyncSerde,
	ObservableItemStorage,
	ObservableAsyncItemStorage,
} from './shared';
import fs from 'fs';
import fsPromise from 'fs/promises';
import {Stream} from 'stream';
import {makeSignal} from '@cdellacqua/signals';
import {debounce} from '@cdellacqua/debounce';
import {makeJSONSerde} from './serde/json-serde';

/**
 * Create a synchronous storage adapter based on a file.
 *
 * @param path The target file path.
 * @param options A serializer/deserializer and whether to watch the file for external changes.
 */
export function sync<T>(
	path: fs.PathLike,
	options: {
		serde: Serde<T, string | NodeJS.ArrayBufferView, Buffer>;
		observe: true;
	},
): ObservableItemStorage<T>;
/**
 * Create a synchronous storage adapter based on a file.
 *
 * @param path The target file path.
 * @param options A serializer/deserializer and whether to watch the file for external changes.
 */
export function sync<T>(
	path: fs.PathLike,
	options: {
		serde: Serde<T, string | NodeJS.ArrayBufferView, Buffer>;
		observe?: false;
	},
): ItemStorage<T>;
/**
 * Create a synchronous storage adapter based on a file.
 *
 * @param path The target file path.
 * @param options A serializer/deserializer and whether to watch the file for external changes.
 */
export function sync<T>(
	path: fs.PathLike,
	options: {
		serde: Serde<T, string | NodeJS.ArrayBufferView, Buffer>;
		observe?: boolean;
	},
): ItemStorage<T> | ObservableItemStorage<T>;

export function sync<T>(
	path: fs.PathLike,
	options: {
		serde: Serde<T, string | NodeJS.ArrayBufferView, Buffer>;
		observe?: boolean;
	},
): ItemStorage<T> | ObservableItemStorage<T> {
	const observe = options.observe ?? false;
	if (!observe) {
		return {
			clear: () => {
				fs.unlinkSync(path);
			},
			get: () =>
				fs.existsSync(path)
					? options.serde.deserialize(fs.readFileSync(path))
					: undefined,
			set: (v) => {
				fs.writeFileSync(path, options.serde.serialize(v));
			},
		};
	} else {
		const change$ = makeSignal<T>();

		// We need to debounce because different OSes
		// emit multiple events for a single write operation (e.g. by emitting
		// one event for the change of the file content and one for the change
		// of the file attributes).
		//
		// The following is a similar solution to the one adopted by chokidar.
		// Reference: https://github.com/paulmillr/chokidar/pull/145
		// Main issue: https://github.com/nodejs/node-v0.x-archive/issues/2126
		const changeListener = debounce(() => {
			if (fs.existsSync(path)) {
				change$.emit(options.serde.deserialize(fs.readFileSync(path)));
			}
		}, 0);
		let watcher = fs.existsSync(path)
			? fs.watch(path, {}, changeListener)
			: undefined;
		return {
			clear: () => {
				watcher?.close();
				watcher = undefined;
				fs.unlinkSync(path);
			},
			get: () =>
				fs.existsSync(path)
					? options.serde.deserialize(fs.readFileSync(path))
					: undefined,
			set: (v) => {
				watcher?.close();
				fs.writeFileSync(path, options.serde.serialize(v));
				watcher = fs.watch(path, {}, changeListener);
			},
			change$,
			unobserve() {
				watcher?.close();
				watcher = undefined;
			},
		};
	}
}

/**
 * Create an asynchronous storage adapter based on a file.
 *
 * @param path The target file path.
 * @param options A serializer/deserializer and whether to watch the file for external changes.
 */
export function async<T>(
	path: fs.PathLike,
	options: {
		serde: AsyncSerde<
			T,
			| string
			| NodeJS.ArrayBufferView
			| Iterable<string | NodeJS.ArrayBufferView>
			| AsyncIterable<string | NodeJS.ArrayBufferView>
			| Stream,
			Buffer
		>;
		observe: true;
	},
): ObservableAsyncItemStorage<T>;

/**
 * Create an asynchronous storage adapter based on a file.
 *
 * @param path The target file path.
 * @param options A serializer/deserializer and whether to watch the file for external changes.
 */
export function async<T>(
	path: fs.PathLike,
	options: {
		serde: AsyncSerde<
			T,
			| string
			| NodeJS.ArrayBufferView
			| Iterable<string | NodeJS.ArrayBufferView>
			| AsyncIterable<string | NodeJS.ArrayBufferView>
			| Stream,
			Buffer
		>;
		observe?: false;
	},
): AsyncItemStorage<T>;

/**
 * Create an asynchronous storage adapter based on a file.
 *
 * @param path The target file path.
 * @param options A serializer/deserializer and whether to watch the file for external changes.
 */
export function async<T>(
	path: fs.PathLike,
	options: {
		serde: AsyncSerde<
			T,
			| string
			| NodeJS.ArrayBufferView
			| Iterable<string | NodeJS.ArrayBufferView>
			| AsyncIterable<string | NodeJS.ArrayBufferView>
			| Stream,
			Buffer
		>;
		observe?: boolean;
	},
): AsyncItemStorage<T> | ObservableAsyncItemStorage<T>;

export function async<T>(
	path: fs.PathLike,
	options: {
		serde: AsyncSerde<
			T,
			| string
			| NodeJS.ArrayBufferView
			| Iterable<string | NodeJS.ArrayBufferView>
			| AsyncIterable<string | NodeJS.ArrayBufferView>
			| Stream,
			Buffer
		>;
		observe?: boolean;
	},
): AsyncItemStorage<T> | ObservableAsyncItemStorage<T> {
	const observe = options.observe ?? false;
	if (!observe) {
		return {
			clear: async () => {
				await fsPromise.unlink(path);
			},
			get: async (getOpts) =>
				fs.existsSync(path)
					? options.serde.deserialize(
							await fsPromise.readFile(path, {
								signal: getOpts?.signal,
							}),
					  )
					: undefined,
			set: async (v, setOpts) => {
				await fsPromise.writeFile(path, await options.serde.serialize(v), {
					signal: setOpts?.signal,
				});
			},
		};
	} else {
		const change$ = makeSignal<T>();

		// We need to debounce because different OSes
		// emit multiple events for a single write operation (e.g. by emitting
		// one event for the change of the file content and one for the change
		// of the file attributes).
		//
		// The following is a similar solution to the one adopted by chokidar.
		// Reference: https://github.com/paulmillr/chokidar/pull/145
		// Main issue: https://github.com/nodejs/node-v0.x-archive/issues/2126
		let expired = true;
		let changeDetectionLooping = false;
		const changeListener = debounce(async () => {
			expired = true;
			if (changeDetectionLooping) {
				return;
			}
			changeDetectionLooping = true;
			try {
				while (expired) {
					expired = false;
					if (!fs.existsSync(path)) {
						break;
					}
					const mostRecentValue = await options.serde.deserialize(
						await fsPromise.readFile(path),
					);
					change$.emit(mostRecentValue);
				}
			} catch (err) {
				console.warn(
					`an error occurred while detecting changes on file "${path}"`,
					err,
				);
			} finally {
				changeDetectionLooping = false;
			}
		}, 0);
		let watcher = fs.existsSync(path)
			? fs.watch(path, {}, () => void changeListener())
			: undefined;
		return {
			clear: async () => {
				watcher?.close();
				watcher = undefined;
				await fsPromise.unlink(path);
			},
			get: async (getOpts) =>
				fs.existsSync(path)
					? await options.serde.deserialize(
							await fsPromise.readFile(path, {
								signal: getOpts?.signal,
							}),
					  )
					: undefined,
			set: async (v, setOpts) => {
				watcher?.close();
				await fsPromise.writeFile(path, await options.serde.serialize(v), {
					signal: setOpts?.signal,
				});
				watcher = fs.watch(path, {}, () => void changeListener());
			},
			change$,
			unobserve() {
				watcher?.close();
				watcher = undefined;
			},
		};
	}
}

/**
 * Create a synchronous storage adapter based on a file with a pre-configured json serializer/deserializer.
 *
 * @param path The target file path.
 * @param options Whether to watch the file for external changes.
 */
export function jsonSync<T>(
	path: fs.PathLike,
	options: {
		observe: true;
	},
): ObservableItemStorage<T>;
/**
 * Create a synchronous storage adapter based on a file with a pre-configured json serializer/deserializer.
 *
 * @param path The target file path.
 * @param options Whether to watch the file for external changes.
 */
export function jsonSync<T>(
	path: fs.PathLike,
	options?: {
		observe?: false;
	},
): ItemStorage<T>;
/**
 * Create a synchronous storage adapter based on a file with a pre-configured json serializer/deserializer.
 *
 * @param path The target file path.
 * @param options Whether to watch the file for external changes.
 */
export function jsonSync<T>(
	path: fs.PathLike,
	options: {observe?: boolean},
): ItemStorage<T> | ObservableItemStorage<T>;
export function jsonSync<T>(
	path: fs.PathLike,
	options?: {observe?: boolean},
): ItemStorage<T> | ObservableItemStorage<T> {
	const jsonConverter = makeJSONSerde<T>();
	return sync(path, {
		serde: {
			deserialize: (fileBuffer) =>
				jsonConverter.deserialize(fileBuffer.toString()),
			serialize: (obj) => jsonConverter.serialize(obj),
		},
		observe: options?.observe,
	});
}

/**
 * Create a synchronous storage adapter based on a file with a pre-configured plain-text (utf-8) serializer/deserializer.
 *
 * @param path The target file path.
 * @param options Whether to watch the file for external changes.
 */
export function textSync(
	path: fs.PathLike,
	options?: {observe?: false},
): ItemStorage<string>;
/**
 * Create a synchronous storage adapter based on a file with a pre-configured plain-text (utf-8) serializer/deserializer.
 *
 * @param path The target file path.
 * @param options Whether to watch the file for external changes.
 */
export function textSync(
	path: fs.PathLike,
	options: {observe: true},
): ObservableItemStorage<string>;
/**
 * Create a synchronous storage adapter based on a file with a pre-configured plain-text (utf-8) serializer/deserializer.
 *
 * @param path The target file path.
 * @param options Whether to watch the file for external changes.
 */
export function textSync(
	path: fs.PathLike,
	options?: {observe?: boolean},
): ItemStorage<string> | ObservableItemStorage<string>;

export function textSync(
	path: fs.PathLike,
	options?: {observe?: boolean},
): ItemStorage<string> | ObservableItemStorage<string> {
	return sync(path, {
		serde: {
			deserialize: (fileBuffer) => fileBuffer.toString(),
			serialize: (str) => str,
		},
		observe: options?.observe,
	});
}

/**
 * Create an asynchronous storage adapter based on a file with a pre-configured json serializer/deserializer.
 *
 * @param path The target file path.
 * @param options Whether to watch the file for external changes.
 */
export function jsonAsync<T>(
	path: fs.PathLike,
	options: {observe: true},
): ObservableAsyncItemStorage<T>;
/**
 * Create an asynchronous storage adapter based on a file with a pre-configured json serializer/deserializer.
 *
 * @param path The target file path.
 * @param options Whether to watch the file for external changes.
 */
export function jsonAsync<T>(
	path: fs.PathLike,
	options?: {observe?: false},
): AsyncItemStorage<T>;
/**
 * Create an asynchronous storage adapter based on a file with a pre-configured json serializer/deserializer.
 *
 * @param path The target file path.
 * @param options Whether to watch the file for external changes.
 */
export function jsonAsync<T>(
	path: fs.PathLike,
	options?: {observe?: boolean},
): AsyncItemStorage<T> | ObservableAsyncItemStorage<T>;

export function jsonAsync<T>(
	path: fs.PathLike,
	options?: {observe?: boolean},
): AsyncItemStorage<T> | ObservableAsyncItemStorage<T> {
	const jsonConverter = makeJSONSerde<T>();
	return async(path, {
		serde: {
			deserialize: (fileBuffer) =>
				jsonConverter.deserialize(fileBuffer.toString()),
			serialize: (obj) => jsonConverter.serialize(obj),
		},
		observe: options?.observe,
	});
}

/**
 * Create an asynchronous storage adapter based on a file with a pre-configured plain-text (utf-8) serializer/deserializer.
 *
 * @param path The target file path.
 * @param options Whether to watch the file for external changes.
 */
export function textAsync(
	path: fs.PathLike,
	options?: {observe?: false},
): AsyncItemStorage<string>;
/**
 * Create an asynchronous storage adapter based on a file with a pre-configured plain-text (utf-8) serializer/deserializer.
 *
 * @param path The target file path.
 * @param options Whether to watch the file for external changes.
 */
export function textAsync(
	path: fs.PathLike,
	options: {observe: true},
): ObservableAsyncItemStorage<string>;
/**
 * Create an asynchronous storage adapter based on a file with a pre-configured plain-text (utf-8) serializer/deserializer.
 *
 * @param path The target file path.
 * @param options Whether to watch the file for external changes.
 */
export function textAsync(
	path: fs.PathLike,
	options?: {observe?: boolean},
): AsyncItemStorage<string> | ObservableAsyncItemStorage<string>;

export function textAsync(
	path: fs.PathLike,
	options?: {observe?: boolean},
): AsyncItemStorage<string> | ObservableAsyncItemStorage<string> {
	return async(path, {
		serde: {
			deserialize: (fileBuffer) => fileBuffer.toString(),
			serialize: (str) => str,
		},
		observe: options?.observe,
	});
}
