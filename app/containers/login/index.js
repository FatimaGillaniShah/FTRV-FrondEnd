/**
 *
 * LoginContainer
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { Login } from '../../components/pages/Login/Index';
import { login } from '../../state/queryFunctions';

function LoginContainer() {
  const handleSubmit = (values) => {
    login(values);
  };
  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description of Login" />
      </Helmet>
      <Login onHandleSubmit={handleSubmit} />
    </>
  );
}

export default memo(LoginContainer);
