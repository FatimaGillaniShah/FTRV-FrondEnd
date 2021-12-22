import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import { usePermission } from '../../hooks/permission';
import NotFound from '../../containers/notFound/loadable';
import { nonFeatures } from '../../utils/constants';

const PrivateRoute = ({ component: Component, resource, path, ...rest }) => {
  const { user } = useAuthContext();
  const { data } = user;
  const can = usePermission(resource);

  const nonfeatures = Object.values(nonFeatures);
  return (
    <Route
      {...rest}
      render={(props) => {
        // If not logged in redirect to login page
        if (!user || !user.isAuthenticated) {
          return <Redirect to="/" />;
        }
        // Check if route has permission
        if (data.isAdmin) {
          return <Component {...props} />;
        }
        if (can || nonfeatures.includes(resource)) {
          return <Component {...props} />;
        }
        return <NotFound />;
      }}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
