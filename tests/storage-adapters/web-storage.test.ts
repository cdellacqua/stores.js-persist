import {expect} from 'chai';
import {WebStorageAdapters} from '../../src/lib';
import {JSDOM} from 'jsdom';

const testsForObserveVariant = () => {
	const localStorageKey = 'local';
	it('tests localStorage R/W', () => {
		const adapter = WebStorageAdapters.local<{
			a: number;
			b: string;
			storage: 'local';
		}>(localStorageKey, {observe: true});
		expect(adapter.get()).to.be.undefined;
		adapter.set({a: 1, b: 'hello', storage: 'local'});
		expect(adapter.get()).to.eqls({a: 1, b: 'hello', storage: 'local'});
		adapter.unobserve();
	});
	it('tests localStorage clear', () => {
		const adapter = WebStorageAdapters.local<{
			a: number;
			b: string;
			storage: 'local';
		}>(localStorageKey, {observe: true});
		adapter.set({a: 1, b: 'hello', storage: 'local'});
		adapter.clear();
		expect(adapter.get()).to.be.undefined;
		adapter.unobserve();
	});

	const sessionStorageKey = 'session';
	it('tests sessionStorage R/W', () => {
		const adapter = WebStorageAdapters.session<{
			a: number;
			b: string;
			storage: 'session';
		}>(sessionStorageKey, {observe: true});
		expect(adapter.get()).to.be.undefined;
		adapter.set({a: 1, b: 'hello', storage: 'session'});
		expect(adapter.get()).to.eqls({a: 1, b: 'hello', storage: 'session'});
		adapter.unobserve();
	});
	it('tests sessionStorage clear', () => {
		const adapter = WebStorageAdapters.session<{
			a: number;
			b: string;
			storage: 'session';
		}>(sessionStorageKey, {observe: true});
		adapter.set({a: 1, b: 'hello', storage: 'session'});
		adapter.clear();
		expect(adapter.get()).to.be.undefined;
		adapter.unobserve();
	});
};

const testsForUnobserveVariant = () => {
	const localStorageKey = 'local';
	it('tests localStorage R/W', () => {
		const adapter = WebStorageAdapters.local<{
			a: number;
			b: string;
			storage: 'local';
		}>(localStorageKey);
		expect(adapter.get()).to.be.undefined;
		adapter.set({a: 1, b: 'hello', storage: 'local'});
		expect(adapter.get()).to.eqls({a: 1, b: 'hello', storage: 'local'});
	});
	it('tests localStorage clear', () => {
		const adapter = WebStorageAdapters.local<{
			a: number;
			b: string;
			storage: 'local';
		}>(localStorageKey, {observe: false});
		adapter.set({a: 1, b: 'hello', storage: 'local'});
		adapter.clear();
		expect(adapter.get()).to.be.undefined;
	});

	const sessionStorageKey = 'session';
	it('tests sessionStorage R/W', () => {
		const adapter = WebStorageAdapters.session<{
			a: number;
			b: string;
			storage: 'session';
		}>(sessionStorageKey);
		expect(adapter.get()).to.be.undefined;
		adapter.set({a: 1, b: 'hello', storage: 'session'});
		expect(adapter.get()).to.eqls({a: 1, b: 'hello', storage: 'session'});
	});
	it('tests sessionStorage clear', () => {
		const adapter = WebStorageAdapters.session<{
			a: number;
			b: string;
			storage: 'session';
		}>(sessionStorageKey);
		adapter.set({a: 1, b: 'hello', storage: 'session'});
		adapter.clear();
		expect(adapter.get()).to.be.undefined;
	});
};

const testsForChangeDetection = () => {
	const localStorageKey = 'local-change';
	it('tests localStorage change detection', async () => {
		const adapter = WebStorageAdapters.local<{
			a: number;
			b: string;
			storage: 'local';
		}>(localStorageKey, {observe: true});
		adapter.set({a: 1, b: 'hello', storage: 'local'});
		let changesDetected = 0;
		adapter.change$.subscribeOnce(() => changesDetected++);
		window.dispatchEvent(
			new window.StorageEvent('storage', {
				key: localStorageKey,
				newValue: JSON.stringify({a: 2, b: 'hi', storage: 'local'}),
				storageArea: localStorage,
			}),
		);
		await new Promise((res) => setTimeout(res, 100));
		expect(changesDetected).to.eq(1);
		adapter.unobserve();
		window.dispatchEvent(
			new window.StorageEvent('storage', {
				key: localStorageKey,
				newValue: JSON.stringify({a: 3, b: 'hey', storage: 'local'}),
				storageArea: localStorage,
			}),
		);
		await new Promise((res) => setTimeout(res, 100));
		expect(changesDetected).to.eq(1);
	});

	const sessionStorageKey = 'session-change';
	it('tests sessionStorage change detection', async () => {
		const adapter = WebStorageAdapters.session<{
			a: number;
			b: string;
			storage: 'session';
		}>(sessionStorageKey, {observe: true});
		adapter.set({a: 1, b: 'hello', storage: 'session'});
		let changesDetected = 0;
		adapter.change$.subscribeOnce(() => changesDetected++);
		window.dispatchEvent(
			new window.StorageEvent('storage', {
				key: sessionStorageKey,
				newValue: JSON.stringify({a: 2, b: 'hi', storage: 'session'}),
				storageArea: sessionStorage,
			}),
		);
		await new Promise((res) => setTimeout(res, 100));
		expect(changesDetected).to.eq(1);
		adapter.unobserve();
		window.dispatchEvent(
			new window.StorageEvent('storage', {
				key: sessionStorageKey,
				newValue: JSON.stringify({a: 3, b: 'hey', storage: 'session'}),
				storageArea: sessionStorage,
			}),
		);
		await new Promise((res) => setTimeout(res, 100));
		expect(changesDetected).to.eq(1);
	});
};

describe('without WebStorage mock', () => {
	before(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(globalThis as any).localStorage = undefined;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(globalThis as any).sessionStorage = undefined;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(globalThis as any).window = undefined;
	});
	describe('web-storage adapter (observe variant)', testsForObserveVariant);
	describe('web-storage adapter (unobserve variant)', testsForUnobserveVariant);
});

describe('with WebStorage mock', () => {
	before(() => {
		const dom = new JSDOM(`<!DOCTYPE html>`, {
			url: 'http://localhost',
		});
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(globalThis as any).localStorage = dom.window.localStorage;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(globalThis as any).sessionStorage = dom.window.sessionStorage;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(globalThis as any).window = dom.window;
	});
	after(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(globalThis as any).localStorage = undefined;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(globalThis as any).sessionStorage = undefined;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(globalThis as any).window = undefined;
	});
	describe('web-storage adapter (observe variant)', testsForObserveVariant);
	describe('web-storage adapter (unobserve variant)', testsForUnobserveVariant);
	describe('web-storage adapter (change detection)', testsForChangeDetection);
});
