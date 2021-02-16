import React from 'react';
import Home from 'containers/Home/Loadable';
import NotFoundPage from 'containers/pageNotFound/Loadable';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../components/hoc/privateRoute';
import { ROLES } from '../utils/constants';

function Routes() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NotFoundPage} />
        {/*<PrivateRoute*/}
        {/*  path="/"*/}
        {/*  exact*/}
        {/*  roles={[ROLES.ADMIN, ROLES.USER]}*/}
        {/*  component={Home}*/}
        {/*/>*/}
      </Switch>
    </>
  );
}

export default Routes;
