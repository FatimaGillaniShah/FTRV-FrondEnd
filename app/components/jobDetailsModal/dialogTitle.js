import React, { memo } from 'react';
import { Box } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AlarmOutlinedIcon from '@material-ui/icons/AlarmOutlined';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import { useStyles } from './style';
import { BodyTextLarge, H4 } from '../typography';

export const DialogTitle = ({
  department,
  location,
  expiryDate,
  onHandleClose,
}) => {
  const classes = useStyles();

  return (
    <>
      <MuiDialogTitle className={classes.root}>
        <IconButton className={classes.closeButton} onClick={onHandleClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>
        <Box
          width={1}
          display="flex"
          flexDirection={['column', 'column', 'column', 'row']}
          mb={3}
          mt={6}
        >
          <Box width={[1, 1, 1 / 3, '40%']} ml={6}>
            <H4 color="secondary">HR Manager</H4>
          </Box>
          <Box
            display="flex"
            flexDirection={['column', 'column', 'column', 'row']}
            justifyContent="flex-end"
            mb={3}
            mt={[5, 5, 5, 1]}
            width={[1, 1, 1 / 3, '60%']}
          >
            <Box
              px={[4, 4, 8, 8]}
              display="flex"
              flexDirection={['row', 'column', 'row', 'row']}
            >
              <LocationOnOutlinedIcon color="secondary" />
              <BodyTextLarge color="grey" fontWeight="fontWeightMedium">
                Location: {location}
              </BodyTextLarge>
            </Box>

            <Box
              px={[4, 4, 8, 8]}
              mt={[1.8, 1.8, 1.8, 0]}
              display="flex"
              flexDirection={['row', 'column', 'row', 'row']}
            >
              <SearchOutlinedIcon color="secondary" />
              <BodyTextLarge color="grey" fontWeight="fontWeightMedium">
                Department: {department}
              </BodyTextLarge>
            </Box>

            <Box
              px={[4, 4, 8, 8]}
              mt={[1.8, 1.8, 1.8, 0]}
              display="flex"
              flexDirection={['row', 'column', 'row', 'row']}
            >
              <AlarmOutlinedIcon color="secondary" />
              <BodyTextLarge color="grey" fontWeight="fontWeightMedium">
                Deadline: {expiryDate}
              </BodyTextLarge>
            </Box>
          </Box>
        </Box>

        <Divider classes={{ root: classes.dividerColor }} />
      </MuiDialogTitle>
    </>
  );
};

DialogTitle.propTypes = {
  department: PropTypes.string,
  location: PropTypes.string,
  expiryDate: PropTypes.string,
  onHandleClose: PropTypes.func,
};

export default memo(DialogTitle);
