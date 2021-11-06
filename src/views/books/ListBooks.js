import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, CardBody } from 'reactstrap';
import { deleteBook, getAllBooks } from '../../api/data/booksData';

const ListBooks = ({ isAdmin, user }) => {
  const [books, setBooks] = useState(null);
  const history = useHistory();

  const updateBooks = () => getAllBooks().then(setBooks);
  useEffect(() => {
    updateBooks();
  }, []);
  const handleDelete = (firebaseKey) => {
    deleteBook(firebaseKey).then(updateBooks);
  };
  if (!books) {
    return 'Loading...';
  }

  return (
    <>
      {user && (
        <Button color="success" onClick={() => history.push('/books/create')}>
          Create Book
        </Button>
      )}
      {books.map((book) => (
        <Card key={book.firebaseKey}>
          <CardBody>
            {book.name}
            <Button
              color="info"
              onClick={() => history.push(`/books/${book.firebaseKey}`)}
            >
              View
            </Button>
            {user && (book.userId === user.uid || !!isAdmin) && (
              <>
                <Button
                  color="success"
                  onClick={() => {
                    history.push(`/books/${book.firebaseKey}/edit`);
                  }}
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  onClick={() => handleDelete(book.firebaseKey)}
                >
                  Delete
                </Button>
              </>
            )}
          </CardBody>
        </Card>
      ))}
    </>
  );
};

ListBooks.propTypes = {
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default ListBooks;
