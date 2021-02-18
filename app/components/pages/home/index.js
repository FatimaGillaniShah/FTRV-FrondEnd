import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  homeFirstColumnGrid: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },

  bannerGridSection: {
    backgroundColor: theme.palette.bgColor.secondary,
    flex: '0.3',
    marginBlock: '0.2rem',
  },
  statsSection: {
    backgroundColor: theme.palette.bgColor.secondary,
    flex: '0.7',
    marginBlock: '0.2rem',
  },
  homeSecondColumnGrid: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    paddingInline: '0.2rem',
  },
  infoPanel_1: {
    marginBlock: '0.2rem',

    backgroundColor: theme.palette.bgColor.secondary,
    flex: '0.25',
  },
  infoPanel_2: {
    marginBlock: '0.2rem',
    backgroundColor: theme.palette.bgColor.secondary,
    flex: '0.45',
  },
  infoPanel_3: {
    marginBlock: '0.2rem',
    backgroundColor: theme.palette.bgColor.secondary,
    flex: '0.3',
  },
}));
function Home() {
  const classes = useStyles();

  return (
    <>
      <Grid xs={12} md={8} className={classes.homeFirstColumnGrid}>
        <Grid xs={12} className={classes.bannerGridSection}>
          <>{/* <img src={Banner} /> */}</>
        </Grid>
        <Grid xs={12} className={classes.statsSection}></Grid>
      </Grid>
      <Grid xs={12} md={4} className={classes.homeSecondColumnGrid}>
        <Grid xs={12} className={classes.infoPanel_1}></Grid>

        <Grid xs={12} className={classes.infoPanel_2}></Grid>

        <Grid xs={12} className={classes.infoPanel_3}></Grid>
      </Grid>
    </>
  );
}

export default Home;
