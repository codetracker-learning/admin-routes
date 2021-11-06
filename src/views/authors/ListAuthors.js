import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'reactstrap';
import { getAllAuthors } from '../../api/data/authorsData';

const ListAuthors = ({ isAdmin, user }) => {
  const [authors, setAuthors] = useState(null);

  useEffect(() => {
    getAllAuthors().then(setAuthors);
  }, []);

  if (!authors) {
    return 'Loading...';
  }

  return (
    <>
      {authors.map((author) => (
        <Card key={author.firebaseKey}>
          {author.name}
          {user && (author.userId === user.uid || !!isAdmin) && (
            <Button>Edit</Button>
          )}
        </Card>
      ))}
    </>
  );
};

ListAuthors.propTypes = {
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default ListAuthors;
