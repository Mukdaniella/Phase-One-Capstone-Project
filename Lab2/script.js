// script.js — beginner DOM wiring using favorites.js
import { getFavorites, isFavorite, addFavorite, removeFavorite } from './favorites.js';

function renderFavorites() {
	const container = document.getElementById('favorites-list');
	if (!container) return;
	const list = getFavorites();
	container.innerHTML = '';
	if (list.length === 0) {
		container.innerHTML = '<p class="text-slate-400 italic">No favorite books added yet. Start exploring to build your list!</p>';
		return;
	}
	list.forEach((book) => {
		const row = document.createElement('div');
		row.className = 'bg-white p-4 rounded-lg shadow hover:shadow-md mb-4 flex items-center gap-4';
		row.innerHTML = `
			<img src="${book.img}" alt="${book.title}" class="h-20 w-20 object-cover rounded" />
			<div class="text-left flex-1">
				<h4 class="text-lg font-bold">${book.title}</h4>
				<p class="text-slate-500 text-sm">${book.author}</p>
			</div>
			<button class="remove-fav bg-red-600 text-white px-3 py-2 rounded hover:bg-red-500">Remove</button>
		`;
		row.querySelector('.remove-fav').addEventListener('click', function () {
			removeFavorite(book.title);
			renderFavorites();
			updateButtonsState();
		});
		container.appendChild(row);
	});
}

function updateButtonsState() {
	const buttons = document.querySelectorAll('.add-fav');
	const list = getFavorites();
	buttons.forEach(function (btn) {
		const card = btn.closest('.bg-white') || btn.closest('div');
		if (!card) return;
		const titleEl = card.querySelector('h4');
		if (!titleEl) return;
		const title = titleEl.textContent;
		const fav = list.some((item) => item.title === title);
		btn.textContent = fav ? 'Remove from Favorites' : 'Add to Favorites';
		btn.classList.toggle('bg-slate-700', !fav);
		btn.classList.toggle('bg-red-600', fav);
	});
}

function wireAddButtons() {
	const buttons = document.querySelectorAll('.add-fav');
	buttons.forEach(function (btn) {
		btn.addEventListener('click', function () {
			const card = btn.closest('.bg-white') || btn.closest('div');
			if (!card) return;
			const titleEl = card.querySelector('h4');
			const authorEl = card.querySelector('p');
			const imgEl = card.querySelector('img');
			if (!titleEl || !authorEl || !imgEl) return;
			const title = titleEl.textContent;
			const author = authorEl.textContent;
			const img = imgEl.getAttribute('src') || imgEl.src;
			if (isFavorite(title)) {
				removeFavorite(title);
			} else {
				addFavorite({ title: title, author: author, img: img });
			}
			renderFavorites();
			updateButtonsState();
		});
	});
}

try {
	wireAddButtons();
	renderFavorites();
	updateButtonsState();
} catch (_) {}

document.addEventListener('DOMContentLoaded', function () {
	try {
		wireAddButtons();
		renderFavorites();
		updateButtonsState();
	} catch (_) {}
});


