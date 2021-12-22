import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import AnnouncementNotification from '../../notification';
import BirthdayCarousel from '../../birthdayCard';
import { usePermission } from '../../../hooks/permission';
import { keys } from '../../../state/queryKeys';
import { useAuthContext } from '../../../context/authContext';
import {
  getBirthdays,
  getQuote,
  retrieveActiveAnnouncements,
  getWorkAnniversaries,
} from '../../../state/queryFunctions';
import BoxWithBg from '../../boxWithBg';
import { H6 } from '../../typography';
import WorkAnniversaryCard from '../../workAnniversary';
import Show from '../../show';
import { PERMISSIONS } from '../../../utils/constants';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 1.2rem',
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
  const [feature, setFeature] = useState({
    ANNOUNCEMENT: false,
    WORK_ANNIVERSARY: false,
    QUOTE: false,
    BIRTHDAY: false,
  });
  const permit = usePermission;
  Object.keys(feature).map((resource) => {
    const can = permit(`${resource}-${PERMISSIONS.READ}`);
    if (can && !feature[resource]) {
      setFeature((prevState) => ({
        ...prevState,
        [resource]: true,
      }));
    }
    return feature;
  });

  const { data } = useQuery(keys.birthday, getBirthdays, {
    refetchOnWindowFocus: true,
    enabled: feature.BIRTHDAY,
  });

  const { data: workAnniversaryData } = useQuery(
    keys.workAnniversary,
    getWorkAnniversaries,
    {
      enabled: feature.WORK_ANNIVERSARY,
    }
  );

  const { data: quoteData } = useQuery(keys.quote, getQuote, {
    enabled: feature.QUOTE,
  });
  const { data: announcementData } = useQuery(
    keys.announcements,
    retrieveActiveAnnouncements,
    {
      refetchOnWindowFocus: true,
      enabled: feature.ANNOUNCEMENT,
    }
  );

  const birthdays = data?.data?.data || [];
  const workAnniversary = workAnniversaryData?.data?.data || [];
  const quote = quoteData?.data?.data;
  let activeAnnouncements = [];
  const { user } = useAuthContext();
  const { announcement = [] } = user;
  const [filterArray, setFilterArray] = useState([]);

  useEffect(() => {
    activeAnnouncements = announcementData?.data?.data?.filter(
      (row) =>
        !announcement.find(
          (localAnnouncement) => row.id === localAnnouncement.id
        )
    );
    setFilterArray(activeAnnouncements);
  }, [announcementData, user]);

  return (
    <>
      <Grid xs={12} className={classes.root}>
        <>
          {filterArray?.map((item) => (
            <Grid xs={12}>
              <AnnouncementNotification item={item} />
            </Grid>
          ))}
        </>

        <Show IF={birthdays.length > 0}>
          <Grid xs={12}>
            <BirthdayCarousel items={birthdays} />
          </Grid>
        </Show>

        <Show IF={workAnniversary.length > 0}>
          <Grid xs={12}>
            <WorkAnniversaryCard items={workAnniversary} />
          </Grid>
        </Show>

        <Grid xs={12}>
          <Show IF={quote}>
            <BoxWithBg
              styles={classes.motivationSection}
              title="Daily Dose of Motivation"
              bgColor="secondary.main"
            >
              <H6>{quote}</H6>
            </BoxWithBg>
          </Show>
        </Grid>
      </Grid>
    </>
  );
}

export default Index;
