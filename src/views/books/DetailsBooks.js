import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { getSingleBook } from '../../api/data/booksData';

const DetailsBooks = ({ isAdmin }) => {
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
  return (
    <>
      {book.name}
      {isAdmin && (
        <>
          <Button color="success">Edit</Button>
          <Button color="danger">Delete</Button>
        </>
      )}
    </>
  );
};

DetailsBooks.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default DetailsBooks;
