import React, { memo } from 'react';
import { Box } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AlarmOutlinedIcon from '@material-ui/icons/AlarmOutlined';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import PropTypes from 'prop-types';
import { colors } from '../../theme/colors';
import { useStyles } from './style';
import { BodyTextLarge, H4 } from '../typography';
import MuiStyledBadge from '../muiStyledBadge';

export const DialogTitle = ({
  department,
  location,
  expiryDate,
  expired,
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
          <Box mb={3} width={[1, 1, 1 / 3, '30%']} ml={6}>
            {expired ? (
              <Box
                display="flex"
                flexDirection={['column', 'column', 'column', 'column']}
                width={1}
              >
                <Box width="65%">
                  <H4 color="secondary">HR Manager</H4>
                </Box>

                <Box mt={1} display="flex" flexDirection="row">
                  <Box ml={6}>
                    <MuiStyledBadge
                      color={colors.oliveGreen}
                      badgeContent="applied"
                    />
                  </Box>
                  <Badge
                    className={classes.badge}
                    badgeContent="expired"
                    color="error"
                  />
                </Box>
              </Box>
            ) : (
              <H4 color="secondary">HR Manager</H4>
            )}
          </Box>
          <Box
            display="flex"
            flexDirection={['column', 'column', 'column', 'row']}
            justifyContent="flex-end"
            mb={3}
            mt={[5, 5, 5, 1.5]}
            width={[1, 1, 1 / 3, '70%']}
          >
            <Box
              px={[4, 4, 8, 3]}
              display="flex"
              flexDirection={['row', 'column', 'row', 'row']}
            >
              <LocationOnOutlinedIcon color="secondary" />
              <BodyTextLarge color="grey" fontWeight="fontWeightMedium">
                Location:
              </BodyTextLarge>
              <Box ml={1}>
                <BodyTextLarge color="grey">{location}</BodyTextLarge>
              </Box>
            </Box>

            <Box
              px={[4, 4, 8, 3]}
              mt={[1.8, 1.8, 1.8, 0]}
              display="flex"
              flexDirection={['row', 'column', 'row', 'row']}
            >
              <SearchOutlinedIcon color="secondary" />
              <BodyTextLarge color="grey" fontWeight="fontWeightMedium">
                Department:
              </BodyTextLarge>
              <Box ml={1}>
                <BodyTextLarge color="grey">{department}</BodyTextLarge>
              </Box>
            </Box>

            <Box
              px={[4, 4, 8, 3]}
              mt={[1.8, 1.8, 1.8, 0]}
              display="flex"
              flexDirection={['row', 'column', 'row', 'row']}
            >
              <AlarmOutlinedIcon color="secondary" />
              <BodyTextLarge color="grey" fontWeight="fontWeightMedium">
                Deadline:
              </BodyTextLarge>
              <Box ml={1}>
                <BodyTextLarge color="grey">{expiryDate}</BodyTextLarge>
              </Box>
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
