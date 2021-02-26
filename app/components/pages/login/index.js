/**
 *
 * login
 *
 */

import React, { memo } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import { Form, Formik } from 'formik';
import useStyles from './style';
import { Input } from '../../index';
import { loginSchema } from '../../../containers/login/schema';
import { Body2 } from '../../typography';

export function Login({ onHandleSubmit, isError, errorMessage }) {
  const classes = useStyles();
  return (
    <Box className={classes.bgContainer} h="100%" width={1}>
      <Container component="main" maxWidth="xs">
        <Box className={classes.loginContainer}>
          <Box className={classes.welcomBox}>
            <h1>Welcome!</h1>
          </Box>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={loginSchema}
            onSubmit={(values) => {
              onHandleSubmit(values);
            }}
          >
            <Form>
              <Paper className={classes.loginBox}>
                <Box mt={7}>
                  <Input
                    name="email"
                    placeholderText="Email"
                    Icon={EmailIcon}
                    appendIcon
                    IconClickable={false}
                  />
                </Box>
                <Box my={5}>
                  <Input
                    type="password"
                    name="password"
                    placeholderText="Password"
                    Icon={LockIcon}
                    appendIcon
                    IconClickable={false}
                  />
                </Box>
                <Box className={classes.centerAlign}>
                  <Button
                    className={classes.loginBtn}
                    fullWidth={false}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Login
                  </Button>
                </Box>
                {isError && (
                  <Box mt={6} textAlign="center" className={classes.error}>
                    <Body2>{errorMessage}</Body2>
                  </Box>
                )}
              </Paper>
            </Form>
          </Formik>
        </Box>
      </Container>
    </Box>
  );
}

export default memo(Login);
