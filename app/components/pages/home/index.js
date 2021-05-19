import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { MuiFileInput } from 'components/muiFileInput';
import { FILE_ACCEPT_TYPES } from 'utils/constants';
import bannerImage from '../../../images/group.png';
import { EventCalendar } from '../events/calendar';
import BannerImage from '../bannerImage/index';

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
    display: 'flex',
  },
  statsSection: {
    backgroundColor: theme.palette.bgColor.secondary,
    flex: '0.7',
    marginBlock: '0.2rem',
  },
  bannerImage: {
    padding: theme.spacing(6, 20),
    flex: 1,
  },
}));
function Home({ eventList, isLoading, bannerImages }) {
  const classes = useStyles();
  const Images = bannerImages?.avatar || bannerImage;
  const [imgFile, setImgFile] = useState(Images);

  return (
    <>
      <Grid xs={12} className={classes.root}>
        <Grid xs={12} className={classes.bannerGridSection}>
          <Box className={classes.bannerImage}>
            <BannerImage imgFile={imgFile} />
          </Box>
          <Box>
            <MuiFileInput
              BtnIcon={EditIcon}
              acceptTypes={FILE_ACCEPT_TYPES.imageFiles}
              name="file"
              buttonText=""
              variant="text"
              iconColor="primary"
              setImgFile={setImgFile}
            />
          </Box>
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
