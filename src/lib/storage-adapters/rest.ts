import {makeJSONSerde} from './serde/json-serde';
import {AsyncItemStorage, AsyncSerde} from './shared';

export type HttpVerbsWithoutBody = 'GET';
export type HttpVerbWithBody = 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type HttpVerb = HttpVerbsWithoutBody | HttpVerbWithBody;

export type RestAsyncStorageAdapterConfig<T, TBody = T> = {
	/** A serializer/deserializer. */
	serde: AsyncSerde<T, BodyInit, TBody>;
	/** Options that overrides the default fetch configuration. */
	fetchOptions?: {
		headers?: HeadersInit;
		credentials?: RequestCredentials;
		redirect?: RequestRedirect;
	};
	/** A function that, given the fetch response object, returns the useful content that needs to be deserialized. */
	bodyExtractor: (response: Response) => Promise<TBody>;
	/** HTTP verbs that should be used to interact with the remote resource. */
	verbs?: {
		get?: HttpVerb;
		set?: HttpVerbWithBody;
		clear?: HttpVerb;
	};
};

export type PartialRESTAsyncStorageAdapterConfig = {
	/** Options that overrides the default fetch configuration. */
	fetchOptions?: {
		headers?: HeadersInit;
		credentials?: RequestCredentials;
		redirect?: RequestRedirect;
	};
	/** HTTP verbs that should be used to interact with the remote resource. */
	verbs?: {
		get?: HttpVerb;
		set?: HttpVerbWithBody;
		clear?: HttpVerb;
	};
};

/**
 * Generate an HTTP-based AsyncItemStorage that uses fetch and the HTTP verbs to interact with a remote resource.
 * By default, the HTTP verbs that this storage uses are GET, PUT and DELETE, but they can be overridden using
 * the `config` parameter.
 *
 * @param resourceUrl The URL of the API responsible for the remote resource.
 * @param config Configuration object containing information on how to deal with the remote resource.
 */
export function async<T, TBody>(
	resourceUrl: string,
	config: RestAsyncStorageAdapterConfig<T, TBody>,
): AsyncItemStorage<T> {
	const verbs = {
		get: config.verbs?.get ?? 'GET',
		set: config.verbs?.set ?? 'PUT',
		clear: config.verbs?.clear ?? 'DELETE',
	};
	const serde = config.serde;

	const {headers, credentials, redirect} = config.fetchOptions ?? {};
	const preConfiguredFetch = (
		method: HttpVerb,
		body?: BodyInit,
		signal?: AbortSignal,
	) => {
		return fetch(resourceUrl, {
			headers,
			credentials,
			method,
			redirect,
			body,
			signal,
		}).then(config.bodyExtractor);
	};

	return {
		get: async (getOpts) => {
			return serde.deserialize(
				await preConfiguredFetch(verbs.get, undefined, getOpts?.signal),
			);
		},
		set: async (value, setOpts) => {
			await preConfiguredFetch(
				verbs.set,
				await serde.serialize(value),
				setOpts?.signal,
			);
		},
		clear: async () => {
			await preConfiguredFetch(verbs.clear);
		},
	};
}

/**
 * Generate a pre-configured HTTP-based AsyncItemStorage that serialize/deserialize to/from JSON and that uses fetch and the HTTP verbs to interact with a remote resource.
 * By default, the HTTP verbs that this storage uses are GET, PUT and DELETE, but they can be overridden using
 * the `config` parameter.
 *
 * @param resourceUrl The URL of the API responsible for the remote resource.
 * @param config Configuration object containing information on how to deal with the remote resource.
 */
export function jsonAsync<T>(
	resourceUrl: string,
	config?: PartialRESTAsyncStorageAdapterConfig,
): AsyncItemStorage<T> {
	const jsonConverter = makeJSONSerde();
	return async(resourceUrl, {
		bodyExtractor: (x) => x.json(),
		serde: {
			serialize: (x) => jsonConverter.serialize(x),
			deserialize: (x: T) => x,
		},
		fetchOptions: {
			...config?.fetchOptions,
			headers: {
				'Content-Type': 'application/json',
				...config?.fetchOptions?.headers,
			},
		},
		verbs: config?.verbs,
	});
}

/**
 * Generate a pre-configured HTTP-based AsyncItemStorage that serialize/deserialize to/from plain-text and that uses fetch and the HTTP verbs to interact with a remote resource.
 * By default, the HTTP verbs that this storage uses are GET, PUT and DELETE, but they can be overridden using
 * the `config` parameter.
 *
 * @param resourceUrl The URL of the API responsible for the remote resource.
 * @param config Configuration object containing information on how to deal with the remote resource.
 */
export function textAsync(
	resourceUrl: string,
	config?: PartialRESTAsyncStorageAdapterConfig,
): AsyncItemStorage<string> {
	return async(resourceUrl, {
		bodyExtractor: (x) => x.text(),
		serde: {
			serialize: (x) => x,
			deserialize: (x) => x,
		},
		fetchOptions: {
			...config?.fetchOptions,
			headers: {
				'Content-Type': 'text/plain',
				...config?.fetchOptions?.headers,
			},
		},
		verbs: config?.verbs,
	});
}
