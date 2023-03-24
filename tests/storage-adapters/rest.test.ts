import {expect} from 'chai';
import {Serde, RESTStorageAdapters} from '../../src/lib';

function mockFetch<T, TSerialized extends BodyInit | null | undefined>(
	initialValue: T | null,
	converter: Serde<T, TSerialized>,
	contentType: string,
	jar?: {
		headers?: object;
	},
) {
	let fetchResponseBody: T | null = initialValue ?? null;
	globalThis.fetch = (_, init) => {
		init?.signal?.throwIfAborted();
		if (jar) {
			jar.headers = init?.headers;
		}
		if (init?.method === 'GET') {
			return Promise.resolve(
				new Response(
					fetchResponseBody && converter.serialize(fetchResponseBody),
					{
						headers: {
							'Content-Type': contentType,
						},
					},
				),
			);
		} else if (init?.method === 'DELETE') {
			fetchResponseBody = null;
			return Promise.resolve(
				new Response('{}', {
					headers: {
						'Content-Type': 'application/json',
					},
				}),
			);
		} else {
			if (init?.body) {
				fetchResponseBody = converter.deserialize(init.body as TSerialized);
			}
			return Promise.resolve(
				new Response('{}', {
					headers: {
						'Content-Type': 'application/json',
					},
				}),
			);
		}
	};
}

describe('rest adapter', () => {
	const originalFetch = globalThis.fetch;
	afterEach(() => {
		globalThis.fetch = originalFetch;
	});
	it('tests asynchronous R/W on REST', async () => {
		mockFetch(
			null,
			{
				serialize: (content: ArrayBuffer) => Buffer.from(content),
				deserialize: (response) => new Uint8Array(response as ArrayBuffer),
			},
			'application/octet-stream',
		);
		const adapter = RESTStorageAdapters.async<Uint8Array, Blob>(
			'http://localhost/json',
			{
				bodyExtractor: (res) => res.blob(),
				serde: {
					serialize: async (content: ArrayBuffer) => Buffer.from(content),
					deserialize: async (blob) => new Uint8Array(await blob.arrayBuffer()),
				},
			},
		);
		expect(await adapter.get()).to.eqls(new Uint8Array([]));
		await adapter.set(new Uint8Array([1, 2, 3]));
		expect(await adapter.get()).to.eqls(new Uint8Array([1, 2, 3]));
	});

	it('tests asynchronous clear on REST', async () => {
		mockFetch(
			null,
			{
				serialize: (content: ArrayBuffer) => Buffer.from(content),
				deserialize: (response) => new Uint8Array(response as ArrayBuffer),
			},
			'application/octet-stream',
		);
		const adapter = RESTStorageAdapters.async<Uint8Array, Blob>(
			'http://localhost/blob',
			{
				bodyExtractor: (response) => response.blob(),
				serde: {
					serialize: (content) => Buffer.from(content),
					deserialize: async (blob) => new Uint8Array(await blob.arrayBuffer()),
				},
			},
		);
		await adapter.set(new Uint8Array([1, 2, 3]));
		expect(await adapter.get()).to.eqls(new Uint8Array([1, 2, 3]));
		await adapter.clear();
		expect(await adapter.get()).to.eqls(new Uint8Array([]));
	});

	it('tests asynchronous R/W on REST with JSON', async () => {
		mockFetch(
			{},
			{
				serialize: (content) => JSON.stringify(content),
				deserialize: (response) => JSON.parse(response as string),
			},
			'application/json',
		);
		const adapter = RESTStorageAdapters.jsonAsync<{
			a: number;
			b: string;
			async: true;
		}>('http://localhost/json');
		expect(await adapter.get()).to.eqls({});
		await adapter.set({a: 1, b: 'hello', async: true});
		expect(await adapter.get()).to.eqls({a: 1, b: 'hello', async: true});
	});

	it('tests asynchronous R/W on REST with text', async () => {
		mockFetch(
			'initial',
			{
				serialize: (content) => String(content),
				deserialize: (response) => String(response as string),
			},
			'text/plain',
		);
		const adapter = RESTStorageAdapters.textAsync('http://localhost/text');
		expect(await adapter.get()).to.eqls('initial');
		await adapter.set("{a: 1, b: 'hello', async: true}");
		expect(await adapter.get()).to.eqls("{a: 1, b: 'hello', async: true}");
	});

	it('tests asynchronous R/W on REST with text and custom verbs', async () => {
		mockFetch(
			'initial',
			{
				serialize: (content) => String(content),
				deserialize: (response) => String(response as string),
			},
			'text/plain',
		);
		const adapter = RESTStorageAdapters.textAsync('http://localhost/text', {
			verbs: {
				set: 'POST',
				clear: 'DELETE',
				get: 'GET',
			},
		});
		expect(await adapter.get()).to.eqls('initial');
		await adapter.set("{a: 1, b: 'hello', async: true}");
		expect(await adapter.get()).to.eqls("{a: 1, b: 'hello', async: true}");
	});
	it('fails asynchronous R/W on REST due to an abort signal', async () => {
		mockFetch(
			'initial',
			{
				serialize: (content) => String(content),
				deserialize: (response) => String(response as string),
			},
			'text/plain',
		);
		const adapter = RESTStorageAdapters.textAsync('http://localhost/text');
		const abortController = new AbortController();
		abortController.abort();
		expect(await adapter.get(abortController).catch(() => 'fail')).to.eqls(
			'fail',
		);
		expect(
			await adapter
				.set("{a: 1, b: 'hello', async: true}", abortController)
				.catch(() => 'fail'),
		).to.eqls('fail');
		expect(await adapter.get()).to.eqls('initial');
	});
	it('tests get on REST with a custom header', async () => {
		const jar = {
			headers: undefined,
		};
		mockFetch(
			'initial',
			{
				serialize: (content) => String(content),
				deserialize: (response) => String(response as string),
			},
			'text/plain',
			jar,
		);
		const adapter = RESTStorageAdapters.textAsync('http://localhost/text', {
			fetchOptions: {
				headers: {
					Authorization: 'let me in!',
				},
			},
		});
		await adapter.get();
		expect(jar.headers).to.include({Authorization: 'let me in!'});
	});
	it('tests set on REST with a custom header', async () => {
		const jar = {
			headers: undefined,
		};
		mockFetch(
			'initial',
			{
				serialize: (content) => String(content),
				deserialize: (response) => String(response as string),
			},
			'text/plain',
			jar,
		);
		const adapter = RESTStorageAdapters.textAsync('http://localhost/text', {
			fetchOptions: {
				headers: {
					Authorization: 'let me in!',
				},
			},
		});
		await adapter.set('hello');
		expect(jar.headers).to.include({Authorization: 'let me in!'});
	});
	it('tests clear on REST with a custom header', async () => {
		const jar = {
			headers: undefined,
		};
		mockFetch(
			'initial',
			{
				serialize: (content) => String(content),
				deserialize: (response) => String(response as string),
			},
			'text/plain',
			jar,
		);
		const adapter = RESTStorageAdapters.textAsync('http://localhost/text', {
			fetchOptions: {
				headers: {
					Authorization: 'let me in!',
				},
			},
		});
		await adapter.clear();
		expect(jar.headers).to.include({Authorization: 'let me in!'});
	});
	it('tests clear on REST with a custom header (json)', async () => {
		const jar = {
			headers: undefined,
		};
		mockFetch(
			{},
			{
				serialize: (content) => String(content),
				deserialize: (response) => String(response as string),
			},
			'application/json',
			jar,
		);
		const adapter = RESTStorageAdapters.jsonAsync('http://localhost/json', {
			fetchOptions: {
				headers: {
					Authorization: 'let me in!',
				},
			},
		});
		await adapter.clear();
		expect(jar.headers).to.include({Authorization: 'let me in!'});
	});
});
