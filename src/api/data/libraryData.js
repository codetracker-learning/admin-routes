import axios from 'axios';
import firebaseConfig from '../apiKeys';

const baseURL = firebaseConfig.databaseURL;

const getAllLibraries = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/libraries.json`)
    .then((response) => resolve(Object.values(response.data || [])))
    .catch(reject);
});

const getSingleLibrary = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/libraries/${firebaseKey}.json`)
    .then((response) => resolve(response.data || {}))
    .catch(reject);
});

const createLibrary = (bookObj) => new Promise((resolve, reject) => {
  axios
    .post(`${baseURL}/libraries.json`, bookObj)
    .then(({ data: { name: firebaseKey } }) => {
      axios
        .patch(`${baseURL}/libraries/${firebaseKey}.json`, { firebaseKey })
        .then(resolve);
    })
    .catch(reject);
});

const updateLibrary = (firebaseKey, bookObj) => new Promise((resolve, reject) => {
  axios
    .patch(`${baseURL}/libraries/${firebaseKey}.json`, bookObj)
    .then(resolve)
    .catch(reject);
});

const getLibraryBooks = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .get(
      `${baseURL}/libraryBooks.json?orderBy="libraryId"&equalTo="${firebaseKey}"`,
    )
    .then((resp) => resolve(Object.values(resp.data)))
    .catch(reject);
});

const deleteLibrary = (firebaseKey) => new Promise((resolve, reject) => {
  const delRelations = getLibraryBooks(firebaseKey).then((ships) => ships.map((ship) => axios.delete(`${baseURL}/libraryBooks/${ship.firebaseKey}.json`)));
  const delProm = axios
    .delete(`${baseURL}/libraries/${firebaseKey}.json`)
    .then(resolve)
    .catch(reject);

  Promise.all([delRelations, delProm]).then(resolve).catch(reject);
});

export {
  getAllLibraries,
  getSingleLibrary,
  createLibrary,
  updateLibrary,
  deleteLibrary,
};
