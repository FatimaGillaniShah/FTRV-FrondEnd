import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useQuery } from 'react-query';
import AnnouncementNotification from '../../announcementNotification';
import BirthdayCarousel from '../../birthdayCard';
import { keys } from '../../../state/queryKeys';
import { getBirthdays, getQuote } from '../../../state/queryFunctions';
import BoxWithBg from '../../boxWithBg';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: '1.2rem',
    ' & > div': {
      marginBottom: '1rem',
    },
  },
  motivationSection: {
    minHeight: 80,
    whiteSpace: 'pre-line',
  },
}));
function Index() {
  const classes = useStyles();
  const { data } = useQuery(keys.birthday, getBirthdays);
  const { data: quoteData } = useQuery(keys.quote, getQuote);

  const birthdays = data?.data?.data;
  const quote = quoteData?.data?.data;
  return (
    <>
      <Grid xs={12} className={classes.root}>
        <Grid xs={12} className={classes.items}>
          <AnnouncementNotification />
        </Grid>

        <Grid xs={12} className={classes.items}>
          <BirthdayCarousel items={birthdays} />
        </Grid>

        <Grid xs={12} className={classes.items}>
          {quote && (
            <BoxWithBg
              styles={classes.motivationSection}
              title="Daily Dose  of Motivation"
              bgColor="secondary.main"
            >
              {quote}
            </BoxWithBg>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default Index;
