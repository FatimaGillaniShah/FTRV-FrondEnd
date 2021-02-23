import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  // @TODO. Get user from context
  const user = {};
  return (
    <Route
      {...rest}
      render={(props) => {
        // If not logged in redirect to login page
        if (!user) {
          return <Redirect to="/" />;
        }
        // check if route is restricted by role
        if (roles && roles.indexOf(user.role) === -1) {
          // role not authorised so redirect to home page and logout
          return <Redirect to="/" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  roles: PropTypes.array
};

export default PrivateRoute;
