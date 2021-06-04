import { Box, Grid } from '@material-ui/core';
import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { useAuthContext } from '../../../context/authContext';
import { FILE_ACCEPT_TYPES, ROLES } from '../../../utils/constants';
import { MuiFileInput } from '../../muiFileInput';
import BannerImage from '../bannerImage';
import { useStyles } from './style';
import { Loading } from '../../loading';
import bannerImagePlaceholder from '../../../images/group.png';

function BannerImageHome({ isImageLoading, onHandleImageChange, fileName }) {
  const classes = useStyles();
  const bannerImageURL = fileName
    ? process.env.API_ASSETS_URL + encodeURIComponent(fileName)
    : bannerImagePlaceholder;
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();
  return (
    <Grid xs={12} className={classes.bannerGridSection}>
      {isImageLoading ? (
        <Loading />
      ) : (
        <>
          <Box className={classes.bannerImage}>
            <BannerImage bannerImageURL={bannerImageURL} />
          </Box>
          {role === ROLES.ADMIN && (
            <Box className={classes.editBox} width="100%">
              <MuiFileInput
                btnIcon={<EditIcon />}
                acceptTypes={FILE_ACCEPT_TYPES.imageFiles}
                name="file"
                buttonText="Update Banner Image"
                variant="text"
                toolTipTitle="Update Image"
                fullWidth
                size="large"
                dimensionValidation
                minimumDimensions={{ height: 200, width: 900 }}
                onFilechange={onHandleImageChange}
              />
            </Box>
          )}
        </>
      )}
    </Grid>
  );
}

export default BannerImageHome;
