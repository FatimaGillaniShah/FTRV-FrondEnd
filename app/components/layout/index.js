import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Header from './header';
import SideMenu from './sideMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    backgroundColor: theme.palette.bgColor.main
  },
  rootGrid: {
    overflow: 'auto',
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
  },
  headerGrid: {
    width: '100%',
    height: '5rem',
    display: 'flex',
    position: 'fixed'
  },
  bodyGrid: {
    width: '100%',
    display: 'flex',
    marginTop: '5rem',
    flex: 1
  },
  menuGrid: {
    width: '8%',
    height: '100%',
    backgroundColor: theme.palette.menuColor.primary
  },

  contentGrid: {
    width: '92%',
    display: 'flex',
    flexGrow: 1,
    padding: '0.2rem',
    overflow: 'scroll',
    height: '100%',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row'
    }
  },

  homeFirstColumnGrid: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },

  bannerGridSection: {
    backgroundColor: theme.palette.bgColor.secondary,
    flex: '0.3',
    marginBlock: '0.2rem'
  },
  statsSection: {
    backgroundColor: theme.palette.bgColor.secondary,
    flex: '0.7',
    marginBlock: '0.2rem'
  },
  homeSecondColumnGrid: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    paddingInline: '0.2rem'
  },
  infoPanel_1: {
    marginBlock: '0.2rem',

    backgroundColor: theme.palette.bgColor.secondary,
    flex: '0.25'
  },
  infoPanel_2: {
    marginBlock: '0.2rem',
    backgroundColor: theme.palette.bgColor.secondary,
    flex: '0.45'
  },
  infoPanel_3: {
    marginBlock: '0.2rem',
    backgroundColor: theme.palette.bgColor.secondary,
    flex: '0.3'
  },

  icon: {
    color: theme.palette.iconColor.main
  }
}));
const Layout = ({ children }) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <div className={classes.root}>
      {location.pathname === '/login' && <>{children}</>}
      {location.pathname !== '/login' && (
        <Grid container xs={12} className={classes.rootGrid}>
          <Grid item className={classes.headerGrid}>
            <Header />
          </Grid>
          <Grid item className={classes.bodyGrid}>
            <Grid item id="newmenu" className={classes.menuGrid}>
              <SideMenu />
            </Grid>
            <Grid Container justify="flex-end" className={classes.contentGrid}>
              {children}
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Layout;
