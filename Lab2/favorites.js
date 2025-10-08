// favorites.js — beginner-friendly localStorage helpers

const STORAGE_KEY = 'bookFavorites';

function getFavorites() {
	const raw = localStorage.getItem(STORAGE_KEY);
	return raw ? JSON.parse(raw) : [];
}

function setFavorites(list) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function isFavorite(title) {
	return getFavorites().some((item) => item.title === title);
}

function addFavorite(book) {
	const list = getFavorites();
	if (!list.some((item) => item.title === book.title)) {
		list.push(book);
		setFavorites(list);
	}
}

function removeFavorite(title) {
	const list = getFavorites().filter((item) => item.title !== title);
	setFavorites(list);
}

export { getFavorites, setFavorites, isFavorite, addFavorite, removeFavorite };


