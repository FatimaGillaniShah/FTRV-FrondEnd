/**
 *
 * DashboardComponent
 *
 */

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { memo } from 'react';
import Header from '../header';
import SideMenu from './menu';

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

function DashboardComponent({ Children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container xs={12} className={classes.rootGrid}>
        <Grid item className={classes.headerGrid}>
          <Header />
        </Grid>
        <Grid item className={classes.bodyGrid}>
          <SideMenu />
          <Grid Container justify="flex-end" className={classes.contentGrid}>
            <Children />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default memo(DashboardComponent);
