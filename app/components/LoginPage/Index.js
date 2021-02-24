/**
 *
 * Login
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import useStyles from './style.js';
import CustomButton from '../CustomButton/Index';
import { Input } from '../index';
function Login() {
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description of Login" />
      </Helmet>
      <Box className={classes.bgContainer}>
        <Container maxWidth="xs">
          <Box className={classes.loginContainer}>
            <Box className={classes.welcomBox}>
              <h1>Welcome!</h1>
            </Box>
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
                  name="password"
                  placeholderText="Password"
                  Icon={LockIcon}
                  appendIcon
                  IconClickable={false}
                />
              </Box>
              <Box className={classes.centerAlign}>
                <CustomButton
                  btnText="login"
                  fullWidth={false}
                  className={classes.loginBtn}
                />
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default memo(Login);
