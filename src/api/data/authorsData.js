import axios from 'axios';
import firebaseConfig from '../apiKeys';

const baseURL = firebaseConfig.databaseURL;

const getAllAuthors = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/authors.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const getSingleLibrary = () => new Promise((resolve) => {
  resolve([]);
});

export { getAllAuthors, getSingleLibrary };
