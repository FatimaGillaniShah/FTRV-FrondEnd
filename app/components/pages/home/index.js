import { Box, Grid } from '@material-ui/core';
import React from 'react';
import BallotIcon from '@material-ui/icons/Ballot';
import EventCalendarHome from './calendar';
import PollHome from './poll';
import BannerImageHome from './bannerImage';
import { useStyles } from './style';
import Show from '../../show';
import { Carousel } from '../../index';
import NotExist from '../../noData';

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
              <EventCalendarHome />
            </Show>
            <Show IF={feature.POLLS}>
              <Box width={[1, 1, 1, 1 / 2]} pb={8}>
                <Show IF={pollList?.length === 0}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="450px"
                  >
                    <NotExist Icon={BallotIcon} description="No Active Polls" />
                  </Box>
                </Show>
                <Show IF={pollList?.length && isVoteReadAllowed}>
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
