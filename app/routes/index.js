import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Directory from '../containers/directory';
import Home from '../containers/home/loadable';
import Login from '../containers/login';
import NotFoundPage from '../containers/pageNotFound/loadable';
import DirectoryImporter from '../containers/directoryImporter/loadable';
import CreateUser from '../containers/createUser/loadable';
import EditUser from '../containers/editUser/loadable';
import PrivateRoute from '../components/hoc/privateRoute';

import { ROLES } from '../utils/constants';

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
          roles={[ROLES.ADMIN]}
          component={DirectoryImporter}
        />
        <PrivateRoute
          exact
          path="/directory/add"
          roles={[ROLES.ADMIN]}
          component={CreateUser}
        />
        <PrivateRoute
          exact
          path="/directory/edit/:id"
          roles={[ROLES.ADMIN]}
          component={EditUser}
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
