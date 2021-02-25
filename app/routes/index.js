import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Directory from '../containers/Directory';
import Home from '../containers/home/loadable';
import Login from '../containers/login';
import NotFoundPage from '../containers/pageNotFound/loadable';
import DirectoryImporter from '../containers/directoryImporter';

import PrivateRoute from '../components/hoc/privateRoute';
// import { ROLES } from '../utils/constants';

// import PrivateRoute from '../components/hoc/privateRoute';
// import { ROLES } from '../utils/constants';

function Routes() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/directory" component={Directory} />
        <PrivateRoute
          exact
          path="/directory/upload"
          component={DirectoryImporter}
        />
        <PrivateRoute component={NotFoundPage} />
        {/* <PrivateRoute */}
        {/*  path="/" */}
        {/*  exact */}
        {/*  roles={[ROLES.ADMIN, ROLES.USER]} */}
        {/*  component={Home} */}
        {/* /> */}
      </Switch>
    </>
  );
}

export default Routes;
