// favorites.js

// Load favorites from localStorage
export function loadFavorites() {
  const stored = localStorage.getItem('favorites');
  return stored ? JSON.parse(stored) : [];
}

// Save favorites to localStorage
export function saveFavorites(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Add a book to favorites
export function addFavorite(book) {
  const favorites = loadFavorites();
  if (!favorites.some(fav => fav.title === book.title)) {
    favorites.push(book);
    saveFavorites(favorites);
  }
}

// Remove a book from favorites
export function removeFavorite(title) {
  const favorites = loadFavorites().filter(fav => fav.title !== title);
  saveFavorites(favorites);
}
