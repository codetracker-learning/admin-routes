import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getAllAuthors } from '../../api/data/authorsData';
import {
  createLibrary,
  getSingleLibrary,
  updateLibrary,
} from '../../api/data/libraryData';

const initialState = {
  name: '',
};

const LibraryForm = () => {
  const [formData, setFormData] = useState(null);
  const [authors, setAuthors] = useState(null);
  const history = useHistory();
  const { libraryId } = useParams();

  useEffect(() => {
    getAllAuthors().then(setAuthors);
    if (libraryId) {
      getSingleLibrary(libraryId).then((resp) => {
        if (resp.firebaseKey) {
          setFormData(resp);
        } else {
          history.push('/libraries');
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
    if (libraryId) {
      updateLibrary(libraryId, { ...formData }).then(() => {
        history.push('/libraries');
      });
    } else {
      createLibrary(formData).then(() => {
        history.push('/libraries');
      });
    }
  };

  if (formData === null || authors === null) {
    return 'Loading...';
  }

  return (
    <>
      <form onSubmit={handleForm}>
        <label htmlFor="name">Library Name</label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInput}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default LibraryForm;
