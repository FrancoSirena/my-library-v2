import React from 'react';
import Axios from 'axios';
import { queryBooks } from './api/helpers';
import SearchForm from './SearchForm';
import SearchList from './SearchList';

function BookSearch() {
  const [list, setList] = React.useState([]);

  const searchBooks = query => {
    Axios.get(queryBooks(query)).then(({ data: { docs } }) => {
      setList(docs);
    });
  };

  return (
    <>
      <h2>Search your books</h2>
      <SearchForm searchBooks={searchBooks} />
      <SearchList list={list} />
    </>
  );
}
export default BookSearch;
