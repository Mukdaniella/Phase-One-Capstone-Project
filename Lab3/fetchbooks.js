// fetchBooks.js
export async function fetchBooks(query = 'bestsellers') {
  try {
    const res = await fetch(`https://openlibrary.org/search.json?q=${query}`);
    const data = await res.json();

    return data.docs.slice(0, 12).map(book => ({
      title: book.title,
      author: book.author_name ? book.author_name[0] : 'Unknown Author',
      cover: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'https://via.placeholder.com/150x200?text=No+Image'
    }));
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
}
