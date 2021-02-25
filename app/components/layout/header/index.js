import {
  AppBar,
  Avatar,
  Box,
  Hidden,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../../context/authContext';
import AvatarImg from '../../../images/avatar.jpeg';
import Logo from '../../../images/logo.png';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'white',
    height: theme.defaultHeights.header,
    color: theme.palette.primary.main,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: { display: 'flex', justifyContent: 'space-between' },
  title: {
    flexGrow: 1,
  },
  logoStyle: {
    width: 150,
  },
  profileBox: {
    display: 'flex',
  },
  titleBox: { display: 'flex', marginInline: '1em', alignItems: 'flex-end' },
  welcomeTextBox: { marginTop: '0.2rem' },
}));

export default function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user, setUser } = useContext(AuthContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setUser({
      data: {},
      isAuthenticated: false,
      token: null,
    });
  };
  return (
    <>
      <AppBar position="absolute" className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <Link to="/">
            <img src={Logo} alt="intranet logo" className={classes.logoStyle} />
          </Link>
          {user.isAuthenticated && (
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
                  <Typography
                    component="h6"
                    variant="h6"
                    color="inherit"
                    noWrap
                  >
                    , {user.data.name}!
                  </Typography>
                </Box>
              </Hidden>
              <>
                <Avatar alt="avatar" src={AvatarImg} onClick={handleClick} />
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  elevation={0}
                  getContentAnchorEl={null}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
