import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { MuiFileInput } from 'components/muiFileInput';
import { FILE_ACCEPT_TYPES } from 'utils/constants';
import bannerImage from '../../../images/group.png';
import { EventCalendar } from '../events/calendar';
import BannerImage from '../bannerImage/index';
import { Poll } from '../../poll';

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
    flexDirection: 'column',
  },
  statsSection: {
    backgroundColor: theme.palette.bgColor.secondary,
    flex: '0.7',
    marginBlock: '0.2rem',
  },
  bannerImage: {
    padding: theme.spacing(0, 20, 6, 20),
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 1, 6, 1),
    },
  },
}));
function Home({ eventList, isLoading, bannerImages, pollData }) {
  const classes = useStyles();
  const Images = bannerImages?.avatar || bannerImage;
  const [imgFile, setImgFile] = useState(Images);

  return (
    <>
      <Grid xs={12} className={classes.root}>
        <Grid xs={12} className={classes.bannerGridSection}>
          <Box alignSelf="flex-end">
            <MuiFileInput
              BtnIcon={EditIcon}
              acceptTypes={FILE_ACCEPT_TYPES.imageFiles}
              name="file"
              buttonText=""
              variant="text"
              iconColor="primary"
              setImgFile={setImgFile}
              isIcon
            />
          </Box>
          <Box className={classes.bannerImage}>
            <BannerImage imgFile={imgFile} />
          </Box>
        </Grid>
        <Grid xs={12} className={classes.statsSection}>
          <Box
            m={[2, 2, 2, 10]}
            display="flex"
            flexDirection={['column', 'column', 'column', 'row']}
          >
            <Box
              height={['45vh', '50vh', '50vh', '50vh']}
              p={2}
              width={[1, 1, 1, 1 / 2]}
              mr={[0, 0, 0, 8]}
              ml={[0, 0, 0, 8]}
            >
              <EventCalendar home eventList={eventList} isLoading={isLoading} />
            </Box>
            {pollData && (
              <Box
                p={2}
                mr={[0, 0, 0, 8]}
                ml={[0, 0, 0, 8]}
                width={[1, 1, 1, 1 / 2]}
              >
                {pollData?.map((val) => (
                  <Poll
                    name={val.name}
                    description={val.description}
                    options={val.options}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
