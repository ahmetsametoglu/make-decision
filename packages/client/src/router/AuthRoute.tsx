import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';

const AuthRoute = ({ isAuth, component: Component, ...rest }: any) => {
  const location = useLocation();
  return (
    <Route
      {...rest}
      render={props =>
        isAuth ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: location } }} />
      }
    />
  );
};

export default AuthRoute;
