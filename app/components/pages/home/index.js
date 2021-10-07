import { Box, Grid } from '@material-ui/core';
import React from 'react';
import BallotIcon from '@material-ui/icons/Ballot';
import EventCalendarHome from './calendar';
import PollHome from './poll';
import BannerImageHome from './bannerImage';
import { useStyles } from './style';
import Show from '../../show';
import { Carousel } from '../../index';
import NotExist from '../notExist';

function Home({
  eventList,
  isImageLoading,
  onHandleImageChange,
  fileName,
  pollList,
  onHandleVoteSubmit,
  isVoteLoading,
  onHandleDelete,
  initialValues,
  eventWindowDate,
  setEventWindowDate,
}) {
  const classes = useStyles();
  return (
    <>
      <Grid xs={12} className={classes.root}>
        <BannerImageHome
          isImageLoading={isImageLoading}
          onHandleImageChange={onHandleImageChange}
          fileName={fileName}
        />

        <Grid xs={12} className={classes.statsSection}>
          <Box
            m={[2, 2, 2, 10]}
            display="flex"
            flexDirection={['column', 'column', 'column', 'row']}
          >
            <EventCalendarHome
              eventList={eventList}
              eventWindowDate={eventWindowDate}
              setEventWindowDate={setEventWindowDate}
            />
            <Box width={[1, 1, 1, 1 / 2]} pb={8}>
              <Show IF={pollList?.length === 0}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="450px"
                >
                  <NotExist Icon={BallotIcon} description="No Active Polls" />;
                </Box>
              </Show>
              <Show IF={pollList?.length}>
                <Carousel navButtonsAlwaysInvisible={pollList?.length <= 1}>
                  {pollList?.map((poll) => (
                    <PollHome
                      poll={poll}
                      onHandleVoteSubmit={onHandleVoteSubmit}
                      isVoteLoading={isVoteLoading}
                      onHandleDelete={onHandleDelete}
                      initialValues={initialValues}
                    />
                  ))}
                </Carousel>
              </Show>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
