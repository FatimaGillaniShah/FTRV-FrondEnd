import React from 'react';
import { Switch } from 'react-router-dom';
import NotFoundPage from '../containers/pageNotFound/loadable';
import { renderRoutes } from './routeFuncs';
import { routeArray } from './routeArray';
import PrivateRoute from '../components/hoc/privateRoute';
import { nonFeatures, PERMISSIONS } from '../utils/constants';

const { READ } = PERMISSIONS;

function Routes() {
  return (
    <>
      <Switch>
        {renderRoutes(routeArray)}
        <PrivateRoute
          resource={`${nonFeatures.NOT_FOUND}-${READ}`}
          component={NotFoundPage}
        />
      </Switch>
    </>
  );
}

export default Routes;
