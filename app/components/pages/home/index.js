import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { Formik } from 'formik';
import EventCalendarHome from './calendar';
import PollHome from './poll';
import BannerImageHome from './bannerImage';
import { useStyles } from './style';

function Home({
  eventList,
  pollData,
  initialData,
  imgFile,
  setImgFile,
  formikRef,
}) {
  const classes = useStyles();
  return (
    <>
      <Formik initialValues={initialData} innerRef={formikRef}>
        {({ setFieldValue }) => (
          <Grid xs={12} className={classes.root}>
            <BannerImageHome
              setFieldValue={setFieldValue}
              imgFile={imgFile}
              setImgFile={setImgFile}
            />
            <Grid xs={12} className={classes.statsSection}>
              <Box
                m={[2, 2, 2, 10]}
                display="flex"
                flexDirection={['column', 'column', 'column', 'row']}
              >
                <EventCalendarHome eventList={eventList} />
                <PollHome pollData={pollData} />
              </Box>
            </Grid>
          </Grid>
        )}
      </Formik>
    </>
  );
}

export default Home;
