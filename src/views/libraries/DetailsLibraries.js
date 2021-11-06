import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleLibrary } from '../../api/data/libraryData';

const DetailsLibraries = () => {
  const { libraryId } = useParams();
  const [library, setLibrary] = useState(null);

  useEffect(() => {
    getSingleLibrary(libraryId).then(setLibrary);
  }, []);

  if (library == null) {
    return 'Loading...';
  }
  return <>{library.name}</>;
};

export default DetailsLibraries;
