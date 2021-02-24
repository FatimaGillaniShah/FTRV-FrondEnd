/**
 *
 * LoginContainer
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { Login } from '../../components/pages/Login/Index';

function LoginContainer() {
  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description of Login" />
      </Helmet>
      <Login />
    </>
  );
}

export default memo(LoginContainer);
