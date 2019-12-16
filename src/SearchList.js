import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { coverURL } from './api/helpers';

function SearchList({ list = [] }) {
  const addBook = key => {
    const localBooks = JSON.parse(localStorage.getItem('myBooks')) || [];
    localBooks.push(key);
    localStorage.setItem('myBooks', JSON.stringify(localBooks));
  };
  return (
    <div className="book-list">
      {list.map(item => (
        <article className="book-list--item" key={item.key}>
          <button
            aria-label="Add to bookshelf"
            className="book-list--item__add"
            onClick={() => addBook(item.key.replace('/works/', ''))}
          >
            <FontAwesomeIcon icon={faPlusCircle} size="2x" />
          </button>
          <div className="book-list--item__details">
            <h1>Title: {item.title}</h1>
            <h2>Author: {(item.author_name || [])[0]}</h2>
            <h2>Subjects:</h2>
            <ul>
              {(item.subject || []).map(sub => (
                <li key={`${item.key}-${sub}`}>{sub}</li>
              ))}
            </ul>
          </div>
          <div className="book-list--item__img">
            {item.cover_i && <img src={coverURL(item.cover_i)} />}
          </div>
        </article>
      ))}
    </div>
  );
}

export default SearchList;
