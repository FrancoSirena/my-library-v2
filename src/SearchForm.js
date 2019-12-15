import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchForm({ searchBooks }) {
  const search = React.useRef();
  return (
    <form
      className="book-form"
      onSubmit={e => {
        e.preventDefault();
        searchBooks(search.current.value);
      }}
    >
      <label htmlFor="search">
        Search
        <input type="text" placeholder="Search" ref={search} id="search" />
      </label>
      <button type="submit">
        <FontAwesomeIcon icon={faSearch} /> Search
      </button>
    </form>
  );
}

export default SearchForm;
