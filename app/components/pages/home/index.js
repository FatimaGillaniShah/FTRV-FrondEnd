import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
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
}));
function Home() {
  const classes = useStyles();

  return (
    <>
      <Grid xs={12} className={classes.root}>
        <Grid xs={12} className={classes.bannerGridSection} />
        <Grid xs={12} className={classes.statsSection} />
      </Grid>
    </>
  );
}

export default Home;
