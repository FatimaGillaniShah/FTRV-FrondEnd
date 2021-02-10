import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from 'containers/Home/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

function Routing() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </>
  );
}

export default Routing;
