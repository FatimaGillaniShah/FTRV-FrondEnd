import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../containers/home/loadable';
import NotFoundPage from '../containers/pageNotFound/loadable';
import FileUploader from '../components/FileUploader';
import Directory from '../components/FileUploader/index copy';
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
        <Route exact path="/directory/file-uploader" component={FileUploader} />
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
