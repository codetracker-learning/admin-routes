import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, CardBody } from 'reactstrap';
import { getAllLibraries, deleteLibrary } from '../../api/data/libraryData';

const ListLibraries = ({ isAdmin }) => {
  const [libraries, setLibraries] = useState(null);
  const history = useHistory();

  const updateLibraries = () => getAllLibraries().then(setLibraries);
  useEffect(() => {
    updateLibraries();
  }, []);

  const handleDelete = (firebaseKey) => {
    deleteLibrary(firebaseKey).then(updateLibraries);
  };

  if (!libraries) {
    return 'Loading...';
  }

  return (
    <>
      {isAdmin && (
        <Button
          color="success"
          onClick={() => history.push('/libraries/create')}
        >
          Create Library
        </Button>
      )}
      {libraries.map((place) => (
        <Card key={place.firebaseKey}>
          <CardBody>
            {place.name}
            <br />
            <Button
              color="info"
              onClick={() => history.push(`/libraries/${place.firebaseKey}`)}
            >
              View
            </Button>
            {isAdmin && (
              <>
                <Button
                  color="success"
                  onClick={() => {
                    history.push(`/libraries/${place.firebaseKey}/edit`);
                  }}
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  onClick={() => handleDelete(place.firebaseKey)}
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

ListLibraries.propTypes = {
  // user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default ListLibraries;
