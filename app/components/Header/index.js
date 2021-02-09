import {
  AppBar,
  Avatar,
  Badge,
  IconButton,
  makeStyles,
  Toolbar,
  Box,
  Typography,
  Hidden
} from '@material-ui/core';

import clsx from 'clsx';
import React from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { style_constants } from 'utils/constants';
import AvatarImg from '../../images/avatar.jpeg';
import Logo from '../../images/logo.png';

const headerWidth =
  style_constants && style_constants.headerWidth
    ? style_constants.headerWidth
    : '5 rem';
const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'white',
    height: `${headerWidth} !important`,
    color: '#153D73',
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
    // flexGrow: 1,
    width: 150
    // height: 100
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <>
      <AppBar position="absolute" className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <img src={Logo} className={classes.logoStyle} />

          <Box style={{ display: 'flex' }}>
            <Box
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                marginTop: '0.7em'
              }}
            >
              <Hidden xsDown>
                <Typography
                  component="subtitle1"
                  variant="subtitle1"
                  color="inherit"
                  noWrap
                  style={{ marginTop: '0.4rem' }}
                >
                  Welcome Back
                </Typography>
                <Typography
                  style={{ marginRight: '1rem', marginTop: '0.2rem' }}
                  component="h6"
                  variant="h6"
                  color="inherit"
                  noWrap
                >
                  , Douglas!
                </Typography>
              </Hidden>
            </Box>
            <Avatar alt="Remy Sharp" src={AvatarImg} />
          </Box>
          {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
        </Toolbar>
      </AppBar>
    </>
  );
}
