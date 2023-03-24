import {makePersistentStore, WebStorageAdapters} from './lib';
import './style.css';

const list = document.querySelector('#list') as HTMLUListElement;
const input = document.querySelector('#input') as HTMLInputElement;
const addButton = document.querySelector('#add-btn') as HTMLButtonElement;
const clearButton = document.querySelector('#clear-btn') as HTMLButtonElement;

const store$ = makePersistentStore<string[]>([], {
	storage: WebStorageAdapters.local('todos'),
});
store$.fetch();

function addTodo() {
	if (input.value) {
		store$.update((cur) => [input.value, ...cur]);
		input.value = '';
	}
}

input.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		addTodo();
	}
});
addButton.addEventListener('click', addTodo);
clearButton.addEventListener('click', () => {
	store$.set([]);
});
store$.subscribe((todos) => {
	while (list.firstChild) {
		list.firstChild.remove();
	}
	todos.forEach((text) => {
		const li = document.createElement('li');
		li.textContent = text;
		list.appendChild(li);
	});
});
