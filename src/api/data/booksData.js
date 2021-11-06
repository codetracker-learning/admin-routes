import axios from 'axios';
import firebaseConfig from '../apiKeys';

const baseURL = firebaseConfig.databaseURL;

const getAllBooks = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/books.json`)
    .then((response) => resolve(Object.values(response.data || [])))
    .catch(reject);
});

const getSingleBook = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/books/${firebaseKey}.json`)
    .then((response) => resolve(response.data || {}))
    .catch(reject);
});

const createBook = (bookObj) => new Promise((resolve, reject) => {
  axios
    .post(`${baseURL}/books.json`, bookObj)
    .then(({ data: { name: firebaseKey } }) => {
      axios
        .patch(`${baseURL}/books/${firebaseKey}.json`, { firebaseKey })
        .then(resolve);
    })
    .catch(reject);
});

const updateBook = (firebaseKey, bookObj) => new Promise((resolve, reject) => {
  axios
    .patch(`${baseURL}/books/${firebaseKey}.json`, bookObj)
    .then(resolve)
    .catch(reject);
});

const deleteBook = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .delete(`${baseURL}/books/${firebaseKey}.json`)
    .then(resolve)
    .catch(reject);
});

export {
  //
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
};
