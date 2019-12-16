import React from 'react';
import nock from 'nock';
import { screen, render, fireEvent, wait } from '@testing-library/react';
import BookSearch from '../BookSearch';

describe('(Component) BookSearch', () => {
  test('It should render a form with a search text', () => {
    render(<BookSearch />);
    screen.getByLabelText('Search by');
    screen.getByText('Search');
  });

  test('It should filter by search by text', async () => {
    nock('http://openlibrary.org')
      .get(/search/i)
      .query({
        q: 'harry',
      })
      .reply(200, {
        docs: [
          {
            key: 'harry-potter',
            title: 'Harry Potter',
            author_name: ['JK Rowling'],
            subject: ['Fantasy'],
          },
        ],
      });
    render(<BookSearch />);
    const input = screen.getByLabelText('Search by');
    fireEvent.change(input, {
      target: {
        value: 'harry',
      },
    });
    await wait(() => expect(input.value).toEqual('harry'));

    fireEvent.click(screen.getByLabelText('Search books'));

    await screen.findByText(/title[:] Harry Potter/i);
    screen.getByText(/author[:] jk rowling/i);
    screen.getByText(/fantasy/i);
  });

  test('It should be able to add books to the shelf', async () => {
    nock('http://openlibrary.org')
      .get(/search/i)
      .query({
        q: 'harry',
      })
      .reply(200, {
        docs: [
          {
            key: 'harry-potter',
            title: 'Harry Potter',
            author_name: ['JK Rowling'],
            subject: ['Fantasy'],
          },
        ],
      });
    render(<BookSearch />);
    const input = screen.getByLabelText('Search by');
    fireEvent.change(input, {
      target: {
        value: 'harry',
      },
    });
    await wait(() => expect(input.value).toEqual('harry'));
    fireEvent.click(screen.getByLabelText('Search books'));
    await screen.findByText(/title[:] Harry Potter/i);
    fireEvent.click(screen.getByLabelText('Add to bookshelf'));
    expect(window.localStorage.getItem('myBooks')).toEqual(
      JSON.stringify(['harry-potter'])
    );
  });
});
