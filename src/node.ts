import {join} from 'path';
import {makeAsyncPersistentStore, makePersistentStore} from './lib';
import {FileStorageAdapters} from './lib';
import readline from 'readline';

async function demo1() {
	console.log('demo1');

	const user$ = makeAsyncPersistentStore<{
		email: string;
		firstName: string;
	} | null>(null, {
		storage: FileStorageAdapters.jsonAsync(join('tmp', 'user.json')),
	});
	await user$.fetch();

	user$.state$.subscribe(console.log);
	user$.subscribe(console.log);
	await user$.fetch();
	await user$.set({email: 'test@example.com', firstName: 'Test'});
}

async function demo2() {
	console.log('demo2');

	const couponCode$ = makeAsyncPersistentStore('', {
		storage: FileStorageAdapters.textAsync(join('tmp', 'coupon-code.txt')),
	});
	await couponCode$.fetch();

	couponCode$.state$.subscribe(console.log);
	couponCode$.subscribe(console.log);
	await couponCode$.fetch();
	await couponCode$.set('1234');
}

async function demo3() {
	console.log('demo3');

	const user$ = makePersistentStore<{email: string; firstName: string} | null>(
		null,
		{
			storage: FileStorageAdapters.jsonSync(join('tmp', 'user-sync.json')),
		},
	);
	user$.fetch();

	user$.subscribe(console.log);
	user$.set({email: 'test@example.com', firstName: 'Test'});
}

async function demo4() {
	console.log('demo4');

	const couponCode$ = makePersistentStore('', {
		storage: FileStorageAdapters.textSync(join('tmp', 'coupon-code-sync.txt')),
	});
	couponCode$.fetch();

	couponCode$.subscribe(console.log);
	couponCode$.set('1234');
}

async function demo5() {
	console.log('demo5 - typewriter');

	const io$ = makePersistentStore('', {
		storage: FileStorageAdapters.textSync(join('tmp', 'io-sync.txt')),
	});
	io$.fetch();

	io$.subscribe((line) => {
		process.stdout.write('\u001b[2K\r' + line);
	});
	process.stdin.setRawMode(true);

	readline.emitKeypressEvents(process.stdin);
	process.stdin.on('keypress', (c, k) => {
		if (k.name === 'c' && k.ctrl) {
			process.exit(0);
		}
		if (k.name === 'backspace') {
			io$.update((line) => line.slice(0, -1));
		} else {
			io$.update((line) => line + c);
		}
	});
}

demo1()
	.then(() => demo2())
	.then(() => demo3())
	.then(() => demo4())
	.then(() => demo5())
	.catch(console.error);
