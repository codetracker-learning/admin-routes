import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { DetailsBooks, ListBooks } from '../views/books';
import DetailsLibraries from '../views/libraries/DetailsLibraries';
import ListLibraries from '../views/libraries/ListLibraries';

const UnAuthedRoutes = ({ user, isAdmin }) => (
  <>
    <Switch>
      <Route exact path="/" component={() => 'Welcome home unauthed user!'} />
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
        path="/books/:bookId"
        component={() => <DetailsBooks user={user} isAdmin={isAdmin} />}
      />
      <Redirect to="/" />
    </Switch>
  </>
);

UnAuthedRoutes.propTypes = {
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default UnAuthedRoutes;
