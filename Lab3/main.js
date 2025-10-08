// main.js
import { fetchBooks } from './fetchBooks.js';

const booksGrid = document.getElementById('books-grid');
const loadingMsg = document.getElementById('loading-msg');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// Render books in the grid
function renderBooks(books) {
  booksGrid.innerHTML = '';

  if (books.length === 0) {
    loadingMsg.textContent = 'No results found.';
    return;
  }

  loadingMsg.textContent = '';

  books.forEach(book => {
    const div = document.createElement('div');
    div.className = 'bg-white p-4 rounded-lg shadow hover:shadow-md';
    div.innerHTML = `
      <img src="${book.cover}" alt="${book.title}" class="h-40 w-full object-cover rounded mb-3" />
      <h4 class="text-lg font-bold">${book.title}</h4>
      <p class="text-slate-500 text-sm">${book.author}</p>
    `;
    booksGrid.appendChild(div);
  });
}

// Load default books on page load
async function loadDefaultBooks() {
  loadingMsg.textContent = 'Loading books...';
  const books = await fetchBooks();
  renderBooks(books);
}

// Search functionality
async function searchBooks() {
  const query = searchInput.value.trim();
  if (!query) return;
  
  loadingMsg.textContent = 'Searching...';
  const books = await fetchBooks(query);
  renderBooks(books);
}

// Event listeners
searchBtn.addEventListener('click', searchBooks);
searchInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') searchBooks();
});

// Initialize
loadDefaultBooks();
