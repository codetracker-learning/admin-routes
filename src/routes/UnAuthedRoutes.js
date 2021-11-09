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
        component={() => <ListLibraries isAdmin={isAdmin} />}
      />
      <Route
        exact
        path="/libraries/:libraryId"
        component={() => <DetailsLibraries />}
      />
      <Route
        exact
        path="/books"
        component={() => <ListBooks user={user} isAdmin={isAdmin} />}
      />
      <Route exact path="/books/:bookId" component={() => <DetailsBooks />} />
      <Redirect to="/" />
    </Switch>
  </>
);

UnAuthedRoutes.propTypes = {
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default UnAuthedRoutes;
