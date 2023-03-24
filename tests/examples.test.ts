import {expect} from 'chai';
import {existsSync, mkdirSync, unlinkSync} from 'fs';
import path from 'path';
import {
	makePersistentStore,
	FileStorageAdapters,
	WebStorageAdapters,
} from '../src/lib';
import {JSDOM} from 'jsdom';

describe('examples', () => {
	mkdirSync('tmp', {recursive: true});
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
	it('README 1', () => {
		for (let i = 0; i < 2; i++) {
			const todos$ = makePersistentStore<string[]>([], {
				storage: WebStorageAdapters.local('todos'),
			});
			todos$.fetch(); // fetch content from local storage if available.

			if (i === 0) {
				expect(todos$.content()).to.eqls([]); // will print [] the first time, and ['drink coffee', 'read the newsletter'] after reloading the page, due to the `.set()` call below.
			} else {
				expect(todos$.content()).to.eqls([
					'drink coffee',
					'read the newsletter',
				]);
			}
			todos$.set(['drink coffee', 'read the newsletter']); // will persist the array to the local storage.
		}
	});
	it('README 2', () => {
		const jsonPath = path.join('tmp', 'todos.txt');
		if (existsSync(jsonPath)) {
			unlinkSync(jsonPath);
		}
		for (let i = 0; i < 2; i++) {
			const todos$ = makePersistentStore<string[]>([], {
				storage: FileStorageAdapters.jsonSync(jsonPath),
			});
			todos$.fetch(); // fetch content from todos.txt if available.

			if (i === 0) {
				expect(todos$.content()).to.eqls([]); // will print [] the first time, and ['drink coffee', 'read the newsletter'] after relaunching the script, due to the `.set()` call below.
			} else {
				expect(todos$.content()).to.eqls([
					'drink coffee',
					'read the newsletter',
				]);
			}
			todos$.set(['drink coffee', 'read the newsletter']); // will persist the array to todos.txt
		}
	});
	it('README 3', () => {
		const dataPath = path.join('tmp', 'data.bin');
		if (existsSync(dataPath)) {
			unlinkSync(dataPath);
		}
		for (let i = 0; i < 2; i++) {
			const data$ = makePersistentStore<Uint8Array>(new Uint8Array(), {
				storage: FileStorageAdapters.sync(dataPath, {
					serde: {
						serialize: (content) => Buffer.from(content),
						deserialize: (buffer) => new Uint8Array(buffer),
					},
				}),
			});
			data$.fetch();

			if (i === 0) {
				expect(data$.content()).to.eqls(new Uint8Array());
			} else {
				expect(data$.content()).to.eqls(new Uint8Array([1, 2, 3]));
			}

			data$.set(new Uint8Array([1, 2, 3]));
		}
	});
});
