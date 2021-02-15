import Home from 'containers/Home/loadable';
import NotFoundPage from 'containers/pageNotFound/loadable';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

function Routing() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
}

export default Routing;
