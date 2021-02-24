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
import InputField from '../InputField/Index';

function Login() {
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description of Login" />
      </Helmet>
      <div className={classes.bgContainer}>
        <Container component="main" maxWidth="xs">
          <div className={classes.loginContainer}>
            <Box className={classes.welcomBox}>
              <h1>Welcome!</h1>
            </Box>
            <Paper className={classes.loginBox}>
              <Box mt={7}>
                <InputField
                  name="email"
                  placeholderText="Email"
                  Icon={EmailIcon}
                  appendIcon
                  IconClickable={false}
                />
              </Box>
              <Box my={5}>
                <InputField
                  name="password"
                  placeholderText="Password"
                  Icon={LockIcon}
                  appendIcon
                  IconClickable={false}
                />
              </Box>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <CustomButton
                  btnText="login"
                  fullWidth={false}
                  className={classes.loginBtn}
                />
              </div>
            </Paper>
          </div>
        </Container>
      </div>
    </>
  );
}

export default memo(Login);
