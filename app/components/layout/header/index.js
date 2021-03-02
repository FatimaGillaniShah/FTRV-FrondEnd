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
  Link,
} from '@material-ui/core';
import clsx from 'clsx';
import React, { useState } from 'react';
import styled from 'styled-components';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { useAuthContext } from '../../../context/authContext';
import AvatarImg from '../../../images/avatar.jpeg';
import Logo from '../../../images/logo.png';
import  { PowerSettingsNew, AccountCircle} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import {H1} from "../../typography";

const StyledMenuItem = styled(MenuItem)`
  &&& {
    padding: 5spx 20px;
  }
`;
const StyledListItemIcon = styled(ListItemIcon)`
  &&& {
    min-width: 24px;
    margin-right: 18px;
    font-size: 24px;
  }
`;
const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'white',
    height: theme.defaultHeights.header,
    color: theme.palette.primary.main,
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
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, setUser } = useAuthContext();

  const handleClick = (event) => {
    event.preventDefault();
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
                <Button onClick={handleClick}>
                  <Avatar alt="avatar" src={AvatarImg} />
                </Button>
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
                  <StyledMenuItem onClick={handleClose}>
                    <StyledListItemIcon>
                      <AccountCircle />
                    </StyledListItemIcon>
                    Profile
                  </StyledMenuItem>
                  <StyledMenuItem onClick={handleLogout}>
                    <StyledListItemIcon>
                      <PowerSettingsNew />
                    </StyledListItemIcon>
                    Logout
                  </StyledMenuItem>
                </Menu>
              </>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
