/* eslint-disable no-nested-ternary */

import firebase from 'firebase/app';
import 'firebase/auth';
import React, { useEffect, useState } from 'react';
import getIsAdmin from '../api/admin';
import Navigation from '../components/Navigation';
import AdminRoutes from '../routes/AdminRoutes';
import AuthedRoutes from '../routes/AuthedRoutes';
import UnAuthedRoutes from '../routes/UnAuthedRoutes';

function Initialize() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfoObj = {
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          uid: authed.uid,
          user: authed.email.split('@')[0],
        };
        setUser(userInfoObj);
        setIsAdmin(getIsAdmin(userInfoObj.uid));
      } else if (user || user === null) {
        setUser(false);
        setIsAdmin(false);
      }
    });
  }, []);

  if (user === null || isAdmin == null) {
    return 'Loading...';
  }
  return (
    <div className="App">
      {user !== null && <Navigation user={user} />}
      {isAdmin ? (
        <AdminRoutes user={user} isAdmin={isAdmin} />
      ) : user ? (
        <AuthedRoutes user={user} isAdmin={isAdmin} />
      ) : (
        <UnAuthedRoutes user={user} isAdmin={isAdmin} />
      )}
    </div>
  );
}

export default Initialize;
