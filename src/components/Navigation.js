import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ButtonGroup } from 'reactstrap';
import { signInUser, signOutUser } from '../api/auth';

function Navigation({ user }) {
  const history = useHistory();

  return (
    <div className="text-center mb-3">
      <ButtonGroup size="lg">
        <button
          onClick={() => history.push('/')}
          type="button"
          className="btn btn-light border border-dark"
        >
          Home
        </button>
        <button
          onClick={() => history.push('/libraries')}
          type="button"
          className="btn btn-light border border-dark"
        >
          Libraries
        </button>
        <button
          onClick={() => history.push('/books')}
          type="button"
          className="btn btn-light border border-dark"
        >
          Books
        </button>
        {user ? (
          <button
            onClick={signOutUser}
            type="button"
            className="btn btn-danger border border-dark"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={signInUser}
            type="button"
            className="btn btn-danger border border-dark"
          >
            Sign In
          </button>
        )}
      </ButtonGroup>
    </div>
  );
}

Navigation.propTypes = {
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
};

export default Navigation;
