import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { DetailsBooks } from '../views/books';
import BookForm from '../views/books/BookForm';
import ListBooks from '../views/books/ListBooks';
import DetailsLibraries from '../views/libraries/DetailsLibraries';
import ListLibraries from '../views/libraries/ListLibraries';

const AuthedRoutes = ({ user, isAdmin }) => (
  <>
    <Switch>
      <Route
        exact
        path="/"
        component={() => `Welcome Home, ${user.fullName}!`}
      />
      <Route
        exact
        path="/libraries"
        component={() => <ListLibraries user={user} isAdmin={isAdmin} />}
      />
      <Route
        exact
        path="/libraries/:libraryId"
        component={() => <DetailsLibraries user={user} isAdmin={isAdmin} />}
      />
      <Route
        exact
        path="/books"
        component={() => <ListBooks user={user} isAdmin={isAdmin} />}
      />
      <Route
        exact
        path="/books/create"
        component={() => <BookForm user={user} isAdmin={isAdmin} />}
      />
      <Route
        exact
        path="/books/:bookId/edit"
        component={() => <BookForm user={user} isAdmin={isAdmin} />}
      />
      <Route
        exact
        path="/books/:bookId"
        component={() => <DetailsBooks user={user} isAdmin={isAdmin} />}
      />
      <Redirect to="/" />
    </Switch>
  </>
);

AuthedRoutes.propTypes = {
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default AuthedRoutes;
