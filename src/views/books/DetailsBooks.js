import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleBook } from '../../api/data/booksData';

const DetailsBooks = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    getSingleBook(bookId).then(setBook);
  }, []);

  if (book == null) {
    return 'Loading...';
  }
  if (!book.firebaseKey) {
    return 'This book does not exist!';
  }
  return <>{book.name}</>;
};

export default DetailsBooks;
