import { Box, Grid } from '@material-ui/core';
import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { useAuthContext } from '../../../context/authContext';
import { FILE_ACCEPT_TYPES, ROLES } from '../../../utils/constants';
import { MuiFileInput } from '../../muiFileInput';
import BannerImage from '../bannerImage';
import { useStyles } from './style';

function BannerImageHome({ imgFile, setImgFile, setFieldValue }) {
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();
  const classes = useStyles();
  return (
    <Grid xs={12} className={classes.bannerGridSection}>
      <Box className={classes.bannerImage}>
        <BannerImage imgFile={imgFile} />
      </Box>
      {role === ROLES.ADMIN && (
        <Box className={classes.editBox} width="100%">
          <MuiFileInput
            btnIcon={<EditIcon />}
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
            dimensionValidation
            minimumDimensions={{ height: 200, width: 900 }}
          />
        </Box>
      )}
    </Grid>
  );
}

export default BannerImageHome;
