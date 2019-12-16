import React from 'react';
import Axios from 'axios';
import { booksURL, coverURL } from './api/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return {
        loading: true,
        data: [],
      };
    case 'success':
      return {
        data: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

function Bookshelf() {
  const [{ data, loading }, dispatch] = React.useReducer(reducer, {
    data: [],
    loading: true,
  });

  React.useEffect(() => {
    new Promise(resolve => {
      const myBooks = JSON.parse(localStorage.getItem('myBooks')) || [];
      resolve(myBooks);
    }).then(myBooks => {
      if (myBooks.length > 0) {
        Axios.all(myBooks.map(book => Axios.get(booksURL(book)))).then(res => {
          dispatch({
            type: 'success',
            payload: res.map(({ data }) => data),
          });
        });
      } else {
        dispatch({
          type: 'success',
          payload: [],
        });
      }
    });
  }, []);

  if (loading) {
    return <span>Checking your books...</span>;
  }

  if (data.length === 0) {
    return <span>Nothing read yet! Start reading here.</span>;
  }

  return (
    <section className="book-display">
      {data.map(({ key, title, covers }) => (
        <div key={key}>
          <h1>{title}</h1>
          {covers && <img width={200} src={coverURL(covers[0], 'L')} />}
          {!covers && <FontAwesomeIcon icon={faImage} size="4x" />}
        </div>
      ))}
    </section>
  );
}

export default Bookshelf;
