import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import BirthdayCarousel from '../../birthdayCard';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    paddingInline: '0.2rem',
  },
  notificationsSection: {
    marginBlock: '0.2rem',

    backgroundColor: theme.palette.bgColor.secondary,
    flex: '0.25',
  },
  birthdaySection: {
    marginBlock: '0.2rem',
    flex: '0.35',
  },
  motivationSection: {
    marginBlock: '0.2rem',
    backgroundColor: theme.palette.bgColor.secondary,
    flex: '0.4',
  },
}));
function Index() {
  const classes = useStyles();
  return (
    <>
      <Grid xs={12} className={classes.root}>
        <Grid xs={12} className={classes.notificationsSection} />

        <Grid xs={12} className={classes.birthdaySection}>
          <BirthdayCarousel />
        </Grid>

        <Grid xs={12} className={classes.motivationSection} />
      </Grid>
    </>
  );
}

export default Index;
