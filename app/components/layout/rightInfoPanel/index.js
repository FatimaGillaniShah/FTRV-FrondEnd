import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useQuery } from 'react-query';
import AnnouncementNotification from '../../announcementNotification';
import BirthdayCarousel from '../../birthdayCard';
import { keys } from '../../../state/queryKeys';
import { getBirthdays } from '../../../state/queryFunctions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: '1.2rem',
    ' & > div': {
      marginBottom: '1rem',
    },
  },
  birthdaySection: {
    backgroundColor: theme.palette.bgColor.secondary,
  },
  motivationSection: {
    marginBlock: '0.2rem',
    backgroundColor: theme.palette.bgColor.secondary,
  },
}));
function Index() {
  const classes = useStyles();
  const { data } = useQuery(keys.birthday, getBirthdays);

  const birthdays = data?.data?.data;
  return (
    <>
      <Grid xs={12} className={classes.root}>
        <Grid xs={12} className={classes.items}>
          <AnnouncementNotification />
        </Grid>

        <Grid xs={12} className={classes.items}>
          <BirthdayCarousel items={birthdays} />
        </Grid>

        <Grid xs={12} className={classes.motivationSection} />
      </Grid>
    </>
  );
}

export default Index;
