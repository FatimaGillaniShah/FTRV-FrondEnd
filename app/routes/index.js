import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Directory from '../containers/Directory';
import Home from '../containers/home/loadable';
import Login from '../containers/Login';
import NotFoundPage from '../containers/pageNotFound/loadable';
// import PrivateRoute from '../components/hoc/privateRoute';
// import { ROLES } from '../utils/constants';

// import PrivateRoute from '../components/hoc/privateRoute';
// import { ROLES } from '../utils/constants';

function Routes() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/directory" component={Directory} />
        <Route exact path="/login" component={Login} />
        <Route component={NotFoundPage} />
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
