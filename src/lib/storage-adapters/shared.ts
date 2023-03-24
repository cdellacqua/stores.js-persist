import {ReadonlySignal} from '@cdellacqua/signals';

/**
 * A serializer/deserializer.
 */
export type Serde<TSerializable, TSerialized, TDeserializable = TSerialized> = {
	/**
	 * Convert the passed value from its deserialized form to a serialized one.
	 */
	serialize(deserialized: TSerializable): TSerialized;
	/**
	 * Convert the passed value from a serialized form to its deserialized one.
	 */
	deserialize(serialized: TDeserializable): TSerializable;
};

/**
 * An asynchronous serializer/deserializer.
 */
export type AsyncSerde<
	TSerializable,
	TSerialized,
	TDeserializable = TSerialized,
> = {
	/**
	 * Convert the passed value from its deserialized form to a serialized one.
	 */
	serialize(deserialized: TSerializable): Promise<TSerialized> | TSerialized;
	/**
	 * Convert the passed value from a serialized form to its deserialized one.
	 */
	deserialize(
		serialized: TDeserializable,
	): Promise<TSerializable> | TSerializable;
};

/**
 * A single item storage that provides a set of common methods.
 */
export type ItemStorage<T> = {
	/**
	 * Return the contained value or undefined if the storage is empty.
	 */
	get(): T | undefined;
	/**
	 * Save the passed value.
	 */
	set(value: T): void;
	/**
	 * Erase the storage content.
	 */
	clear(): void;
};

/**
 * A single item storage that provides a set of common methods and a `change$` signal to listen
 * for external modifications to the content of the storage.
 *
 * Note: when disposing of this type of storage, make sure to call `.unobserve()`, so that
 * all the associated resource may be properly freed (e.g. a file system watcher, an event listener on the Window, etc.).
 */
export type ObservableItemStorage<T> = ItemStorage<T> & {
	change$: ReadonlySignal<T>;
	unobserve(): void;
};

/**
 * An asynchronous single item storage that provides a set of common methods.
 */
export type AsyncItemStorage<T> = {
	/**
	 * Return the contained value or undefined if the store is empty.
	 */
	get(options?: {signal?: AbortSignal}): Promise<T | undefined>;
	/**
	 * Save the passed value.
	 */
	set(value: T, options?: {signal?: AbortSignal}): Promise<void>;
	/**
	 * Erase the storage content.
	 */
	clear(options?: {signal?: AbortSignal}): Promise<void>;
};

/**
 * An asynchronous single item storage that provides a set of common methods and a `change$` signal to listen
 * for external modifications to the content of the storage.
 *
 * Note: when disposing of this type of storage, make sure to call `.unobserve()`, so that
 * all the associated resource may be properly freed (e.g. a file system watcher, an event listener on the Window, etc.).
 */
export type ObservableAsyncItemStorage<T> = AsyncItemStorage<T> & {
	change$: ReadonlySignal<T>;
	unobserve(): void;
};
