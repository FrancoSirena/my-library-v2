// import queryString from "query-string";

export const booksURL = bookID =>
  `https://openlibrary.org/works/${bookID}.json`;

export const coverURL = (coverID, size = 'M') =>
  `http://covers.openlibrary.org/b/id/${coverID}-${size}.jpg`;

export const queryBooks = search =>
  `http://openlibrary.org/search.json?q=${encodeURI(search)}`;

export const baseURL = `http://openlibrary.org`;
