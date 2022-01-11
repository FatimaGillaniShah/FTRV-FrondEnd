import { Box, Grid } from '@material-ui/core';
import React from 'react';
import EventCalendarHome from './calendar';
import PollHome from './poll';
import BannerImageHome from './bannerImage';
import { useStyles } from './style';
import Show from '../../show';
import { Carousel } from '../../index';

function Home({
  isImageLoading,
  onHandleImageChange,
  fileName,
  pollList,
  onHandleVoteSubmit,
  isVoteLoading,
  onHandleDelete,
  initialValues,
  feature,
  isVoteReadAllowed,
  isVoteWriteAllowed,
  isPollsWriteAllowed,
  isBannerWriteAllowed,
}) {
  const isPollExists = pollList?.length > 0;
  const classes = useStyles();
  const featureExists = feature.EVENTS || feature.POLLS;
  return (
    <>
      <Grid xs={12} className={classes.root}>
        <BannerImageHome
          isImageLoading={isImageLoading}
          onHandleImageChange={onHandleImageChange}
          fileName={fileName}
          isReadAllowed={feature.BANNER_IMAGE}
          isWriteAllowed={isBannerWriteAllowed}
        />
        <Grid
          xs={12}
          className={
            featureExists ? classes.statsSection : classes.statsEmptySection
          }
        >
          <Box
            m={[2, 2, 2, 10]}
            display="flex"
            flexDirection={['column', 'column', 'column', 'row']}
          >
            <Show IF={feature.EVENTS}>
              <Box width={isPollExists ? [1, 1, 1, 1 / 2] : 1}>
                <EventCalendarHome />
              </Box>
            </Show>
            <Show IF={feature.POLLS && isPollExists}>
              <Box width={[1, 1, 1, 1 / 2]} pb={8}>
                <Show IF={isVoteReadAllowed}>
                  <Carousel navButtonsAlwaysInvisible={pollList?.length <= 1}>
                    {pollList?.map((poll) => (
                      <PollHome
                        poll={poll}
                        onHandleVoteSubmit={onHandleVoteSubmit}
                        isVoteLoading={isVoteLoading}
                        isVoteWriteAllowed={isVoteWriteAllowed}
                        onHandleDelete={onHandleDelete}
                        initialValues={initialValues}
                        isWriteAllowed={isPollsWriteAllowed}
                      />
                    ))}
                  </Carousel>
                </Show>
              </Box>
            </Show>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
