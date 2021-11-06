import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getAllAuthors } from '../../api/data/authorsData';
import {
  createBook,
  getSingleBook,
  updateBook,
} from '../../api/data/booksData';

const initialState = {
  name: '',
  authorId: '',
};

const BookForm = ({ user }) => {
  const [formData, setFormData] = useState(null);
  const [authors, setAuthors] = useState(null);
  const history = useHistory();
  const { bookId } = useParams();

  useEffect(() => {
    getAllAuthors().then(setAuthors);
    if (bookId) {
      getSingleBook(bookId).then((resp) => {
        if (resp.firebaseKey) {
          setFormData(resp);
        } else {
          history.push('/books');
        }
      });
    } else {
      setFormData(initialState);
    }
  }, []);

  const handleInput = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (bookId) {
      updateBook(bookId, { ...formData }).then(() => {
        history.push('/books');
      });
    } else {
      createBook({ ...formData, userId: user.uid }).then(() => {
        history.push('/books');
      });
    }
  };

  if (formData === null || authors === null) {
    return 'Loading...';
  }

  return (
    <>
      <form onSubmit={handleForm}>
        <label htmlFor="name">Book Name</label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInput}
        />
        <label htmlFor="authorId">Book Author</label>
        <select
          onChange={handleInput}
          id="authorId"
          name="authorId"
          value={formData.authorId}
        >
          {authors.map((author) => (
            <option key={author.firebaseKey} value={author.firebaseKey}>
              {author.name}
            </option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
BookForm.propTypes = {
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  // isAdmin: PropTypes.bool.isRequired,
};

export default BookForm;
