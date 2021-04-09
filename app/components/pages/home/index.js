import { Avatar, Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import bannerImage from '../../../images/group.png';
import { EventCalendar } from '../events/calendar';

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
    padding: theme.spacing(6, 20),
  },
  statsSection: {
    backgroundColor: theme.palette.bgColor.secondary,
    flex: '0.7',
    marginBlock: '0.2rem',
  },
  bannerImage: {
    backgroundImage: `url(${bannerImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    backgroundPosition: 'center',
    height: '25vh',
  },
}));
function Home({ eventList, isLoading }) {
  const classes = useStyles();

  return (
    <>
      <Grid xs={12} className={classes.root}>
        <Grid xs={12} className={classes.bannerGridSection}>
          <Box className={classes.bannerImage} />
        </Grid>
        <Grid xs={12} className={classes.statsSection}>
          <Box m={10}>
            <Box height="50vh" width={[1, 1, 1, 1 / 2]}>
              <EventCalendar home eventList={eventList} isLoading={isLoading} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
