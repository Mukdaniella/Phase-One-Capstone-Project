// main.js
import { loadFavorites, addFavorite, removeFavorite } from './favorites.js';

// Get DOM elements
const favoritesList = document.getElementById('favorites-list');
const addButtons = document.querySelectorAll('.add-fav');

// Load and render favorites when the page loads
document.addEventListener('DOMContentLoaded', () => {
  renderFavorites();
  setupAddButtons();
});

// RENDER FAVORITES
function renderFavorites() {
  const favorites = loadFavorites();

  favoritesList.innerHTML = '';

  if (favorites.length === 0) {
    favoritesList.innerHTML = `<p class="text-slate-400 italic">No favorite books added yet. Start exploring to build your list!</p>`;
    return;
  }

  favorites.forEach(book => {
    const div = document.createElement('div');
    div.className = 'bg-white p-4 rounded-lg shadow mb-4 text-left';
    div.innerHTML = `
      <img src="${book.image}" alt="${book.title}" class="h-40 w-full object-cover rounded mb-3" />
      <h4 class="text-lg font-bold">${book.title}</h4>
      <p class="text-slate-500 text-sm">${book.author}</p>
      <button class="remove-fav bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Remove</button>
    `;
    favoritesList.appendChild(div);

    div.querySelector('.remove-fav').addEventListener('click', () => {
      removeFavorite(book.title);
      renderFavorites();
      updateAddButtons(); // Re-enable the button when removed
    });
  });

  updateAddButtons(); // Disable buttons on page load
}

// ADD TO FAVORITES BUTTONS
function setupAddButtons() {
  addButtons.forEach(button => {
    button.addEventListener('click', () => {
      const bookCard = button.closest('div');
      const book = {
        title: bookCard.querySelector('h4').textContent,
        author: bookCard.querySelector('p').textContent,
        image: bookCard.querySelector('img').src
      };

      addFavorite(book);
      renderFavorites();
      alert(`${book.title} added to favorites!`);
    });
  });
}

// DISABLE BUTTONS IF BOOK ALREADY IN FAVORITES
function updateAddButtons() {
  const favorites = loadFavorites();

  addButtons.forEach(button => {
    const bookCard = button.closest('div');
    const title = bookCard.querySelector('h4').textContent;

    if (favorites.some(fav => fav.title === title)) {
      button.disabled = true;
      button.classList.add('bg-gray-400', 'cursor-not-allowed');
      button.classList.remove('bg-slate-700', 'hover:bg-slate-600');
    } else {
      button.disabled = false;
      button.classList.remove('bg-gray-400', 'cursor-not-allowed');
      button.classList.add('bg-slate-700', 'hover:bg-slate-600');
    }
  });
}
