import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Directory from '../containers/directory';
import Home from '../containers/home/loadable';
import Login from '../containers/login';
import NotFoundPage from '../containers/pageNotFound/loadable';
import DirectoryImporter from '../containers/directoryImporter/loadable';

import PrivateRoute from '../components/hoc/privateRoute';
// import { ROLES } from '../utils/constants';

// import PrivateRoute from '../components/hoc/privateRoute';
// import { ROLES } from '../utils/constants';
import CreateUser from '../containers/createUser/loadable';
import EditUser from '../containers/editUser/loadable';

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
        <PrivateRoute exact path="/directory/add" component={CreateUser} />
        <PrivateRoute exact path="/directory/edit/:id" component={EditUser} />
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
