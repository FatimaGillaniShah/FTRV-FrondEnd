import { Box, Grid } from '@material-ui/core';
import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import clsx from 'clsx';
import { FILE_ACCEPT_TYPES } from '../../../utils/constants';
import { MuiFile } from '../../muiFile';
import BannerImage from '../bannerImage';
import { useStyles } from './style';
import { Loading } from '../../loading';
import bannerImagePlaceholder from '../../../images/group.png';
import Show from '../../show';

function BannerImageHome({
  isImageLoading,
  onHandleImageChange,
  fileName,
  isWriteAllowed,
  isReadAllowed,
}) {
  const classes = useStyles();
  const bannerImageURL = fileName || bannerImagePlaceholder;

  return (
    <Grid
      xs={12}
      className={clsx({
        [classes.bannerGridSectionWHover]: isWriteAllowed,
        [classes.bannerGridSection]: isReadAllowed,
      })}
    >
      {isImageLoading ? (
        <Loading />
      ) : (
        <>
          <Box className={classes.bannerImage}>
            <BannerImage bannerImageURL={bannerImageURL} />
          </Box>
          <Show IF={isWriteAllowed}>
            <Box
              className={classes.editBox}
              width="100%"
              justifyContent="center"
              display="flex"
            >
              <MuiFile
                btnIcon={<EditIcon />}
                acceptTypes={FILE_ACCEPT_TYPES.imageFiles}
                buttonText="Update Banner Image"
                variant="text"
                toolTipTitle="Update Banner Image"
                size="large"
                dimensionValidation
                minimumDimensions={{ height: 200, width: 900 }}
                onFilechange={onHandleImageChange}
              />
            </Box>
          </Show>
        </>
      )}
    </Grid>
  );
}

export default BannerImageHome;
