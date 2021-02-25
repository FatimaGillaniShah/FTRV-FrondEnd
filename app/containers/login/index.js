/**
 *
 * LoginContainer
 *
 */

import React, { memo, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation } from 'react-query';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import { Login } from '../../components/pages/Login/Index';
import { login } from '../../state/queryFunctions';
import { AuthContext } from '../../context/authContext';
// import { useAuthContext } from '../../context/authContext';

function LoginContainer() {
  const mutation = useMutation((values) => login(values));
  const { data, isError, isSuccess, error } = mutation;
  const { user, setUser } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (isSuccess) {
      setUser({
        data: data.data.data,
        isAuthenticated: true,
        token: data.data.data.token,
      });
    }
  }, [data]);
  useEffect(() => {
    if (user.isAuthenticated) {
      history.push('/home');
    }
  }, [user.isAuthenticated]);

  const handleSubmit = (values) => {
    mutation.mutate(values);
  };
  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description of Login" />
      </Helmet>
        <Login
          onHandleSubmit={handleSubmit}
          isError={isError}
          errorMessage={error && error.response.data.message}
        />
    </>
  );
}

export default memo(LoginContainer);
