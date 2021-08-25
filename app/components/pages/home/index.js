import { Box, Grid } from '@material-ui/core';
import React from 'react';
import EventCalendarHome from './calendar';
import PollHome from './poll';
import BannerImageHome from './bannerImage';
import { useStyles } from './style';
import Show from '../../show';
import { Carousel } from '../../index';

function Home({
  eventList,
  pollData,
  isImageLoading,
  onHandleImageChange,
  fileName,
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
            <EventCalendarHome eventList={eventList} />
            <Box width={[1, 1, 1, 1 / 2]} pb={8}>
              <Show IF={pollData.length}>
                <Carousel>
                  {pollData.map((poll) => (
                    <PollHome pollData={poll} />
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
