import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <header>
      <h1>
        <FontAwesomeIcon icon={faBook} /> Personal Book keeper
      </h1>
    </header>
  );
}

export default Header;
