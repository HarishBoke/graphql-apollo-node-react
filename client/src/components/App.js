import React, { useEffect } from 'react';
import {  BOOK_ADDED, GET_BOOKS } from '../graphql/queries';
import { useQuery } from '@apollo/client';

function App() {
  const { data, loading, error, subscribeToMore } = useQuery(GET_BOOKS);

  useEffect(() => {
    subscribeToMore({
      document: BOOK_ADDED,
      updateQuery: (prev, { subscriptionData }) => {
        const bookAdded = subscriptionData.data.bookAdded;
        return {
          ...prev,
          books: [...prev.books, bookAdded]
        }
      }
    });
  }, [subscribeToMore]);

  if (loading) return <div>Loading</div>
  if (error) return <div>{error.message}</div>


  return (
      <div className="App">
        {data.books.map((book, index) => (
          <div key={index}>
            {book.title}
          </div>
        ))}
      </div>
  );
}

export default App;
