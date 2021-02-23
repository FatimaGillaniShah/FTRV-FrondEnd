import {
  AppBar,
  Avatar,
  Box,
  Hidden,
  makeStyles,
  Toolbar,
  Typography
} from '@material-ui/core';
import clsx from 'clsx';
import AvatarImg from 'images/avatar.jpeg';
import Logo from 'images/logo.png';
import React from 'react';
import { STYLE_CONSTANTS } from 'utils/constants';

const headerWidth =
  STYLE_CONSTANTS && STYLE_CONSTANTS.HEADER_WIDTH
    ? STYLE_CONSTANTS.HEADER_WIDTH
    : '5 rem';
const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'white',
    height: `${headerWidth} !important`,
    color: theme.palette.primary.main,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  toolbar: { display: 'flex', justifyContent: 'space-between' },
  title: {
    flexGrow: 1
  },
  logoStyle: {
    width: 150
  },
  profileBox: {
    display: 'flex'
  },
  titleBox: { display: 'flex', marginInline: '1em', alignItems: 'flex-end' },
  welcomeTextBox: { marginTop: '0.2rem' }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <>
      <AppBar position="absolute" className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <img src={Logo} className={classes.logoStyle} />

          <Box className={classes.profileBox}>
            <Hidden xsDown>
              <Box className={classes.titleBox}>
                <Box className={classes.welcomeTextBox}>
                  <Typography
                    component="h1"
                    variant="subtitle1"
                    color="inherit"
                    noWrap
                  >
                    Welcome Back
                  </Typography>
                </Box>
                <Typography component="h6" variant="h6" color="inherit" noWrap>
                  , Douglas!
                </Typography>
              </Box>
            </Hidden>
            <Avatar alt="avatar" src={AvatarImg} />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
