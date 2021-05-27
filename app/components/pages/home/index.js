import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useRef, useEffect } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { MuiFileInput } from 'components/muiFileInput';
import { FILE_ACCEPT_TYPES } from 'utils/constants';
import { Formik } from 'formik';
import bannerImage from '../../../images/group.png';
import { EventCalendar } from '../events/calendar';
import BannerImage from '../bannerImage/index';
import { Poll } from '../../poll';
import { bannerImageSizeValidation } from './bannerImageSizeValidation';
import { Toast } from '../../../utils/helper';

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
    position: 'relative',
    '&:hover': {
      '& $bannerImage': {
        opacity: 0.7,
        padding: theme.spacing(6, 20),
      },
      '& $editBox': { opacity: 1 },
    },
  },
  statsSection: {
    backgroundColor: theme.palette.bgColor.secondary,
    flex: '0.7',
    marginBlock: '0.2rem',
  },
  bannerImage: {
    padding: theme.spacing(6, 20),
    flex: 1,
    opacity: 1,
    display: 'block',
    width: '100%',
    height: 'auto',
    transition: '.5s ease',
    'backface-visibility': 'hidden',
  },
  editBox: {
    transition: '.5s ease',
    opacity: 0,
    position: 'absolute',
    top: '92%',
    [theme.breakpoints.down('sm')]: {
      top: '85%',
    },
    left: '50%',
    transform: 'translate(-50%,  -50%)',
    '-ms-transform': 'translate(-50%,  -50%)',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
}));
function Home({ eventList, isLoading, bannerImages, pollData, initialData }) {
  const classes = useStyles();
  const Images = bannerImages?.avatar || bannerImage;
  const [imgFile, setImgFile] = useState(Images);
  const yupValidation = bannerImageSizeValidation;
  const formikRef = useRef();

  useEffect(() => {
    if (formikRef.current?.errors?.file) {
      setImgFile(Images);
      Toast({
        icon: 'error',
        title: formikRef.current.errors.file,
      });
    }
  }, [imgFile]);

  return (
    <>
      <Formik
        initialValues={initialData}
        innerRef={formikRef}
        validationSchema={yupValidation}
      >
        {({ setFieldValue }) => (
          <Grid xs={12} className={classes.root}>
            <Grid xs={12} className={classes.bannerGridSection}>
              <Box className={classes.bannerImage}>
                <BannerImage imgFile={imgFile} />
              </Box>
              <Box className={classes.editBox} width="100%">
                <MuiFileInput
                  btnIcon={EditIcon}
                  acceptTypes={FILE_ACCEPT_TYPES.imageFiles}
                  name="file"
                  buttonText="Update Banner Image"
                  variant="text"
                  iconColor="primary"
                  setImgFile={setImgFile}
                  toolTipTitle="Update Image"
                  fullWidth
                  size="large"
                  setFieldValue={setFieldValue}
                />
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
                  <EventCalendar
                    home
                    eventList={eventList}
                    isLoading={isLoading}
                  />
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
        )}
      </Formik>
    </>
  );
}

export default Home;
