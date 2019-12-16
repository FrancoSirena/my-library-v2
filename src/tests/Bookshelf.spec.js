import React from 'react';
import nock from 'nock';
import { screen, render } from '@testing-library/react';
import Bookshelf from '../Bookshelf';

describe('(Component) BookShelft', () => {
  test('It should render a message saying no books read yet', async () => {
    window.localStorage.setItem('myBooks', null);
    render(<Bookshelf />);
    screen.getByText(/Checking your books/i);
    await screen.findByText(/Nothing read yet! Start reading here/i);
  });

  test('It should render list of books if any is present', async () => {
    nock('https://openlibrary.org')
      .get(/works/i)
      .reply(200, {
        title: 'my book title',
        covers: [],
        key: 'any-1',
      });
    window.localStorage.setItem('myBooks', JSON.stringify(['any-1']));
    render(<Bookshelf />);
    await screen.findByText(/my book title/i);
  });
});
