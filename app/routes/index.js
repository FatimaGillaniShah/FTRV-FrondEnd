import React from 'react';
import { Switch } from 'react-router-dom';
import { AppRoutes } from './routeFuncs';

function Routes() {
  return (
    <>
      <Switch>
        <AppRoutes />
      </Switch>
    </>
  );
}

export default Routes;
