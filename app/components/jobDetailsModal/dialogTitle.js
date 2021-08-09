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
import { colors } from '../../theme/colors';
import { useStyles } from './style';
import { BodyTextLarge, H4 } from '../typography';
import { MuiBadge, ToolTip } from '../index';
import Show from '../show';

export const DialogTitle = ({
  department,
  location,
  expiryDate,
  expired,
  onHandleClose,
  applied,
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
          <Box mb={2} width={[1, 1, 1 / 3, '30%']}>
            {expired || applied ? (
              <Box
                display="flex"
                flexDirection={['column', 'column', 'column', 'column']}
                width={1}
              >
                <Box mb={4} width="65%">
                  <H4 color="secondary">HR Manager</H4>
                </Box>
                <Box ml={7} display="flex" flexDirection="row">
                  <Show IF={applied}>
                    <MuiBadge color={colors.info} badgeContent="applied" />
                  </Show>
                  <Show IF={expired}>
                    <MuiBadge badgeContent="expired" color="error" />
                  </Show>
                </Box>
              </Box>
            ) : (
              <>
                <H4 color="secondary">HR Manager</H4>
                <Box mt={1} ml={7}>
                  <MuiBadge color={colors.oliveGreen} badgeContent="active" />
                </Box>
              </>
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
              <BodyTextLarge color="grey" fontWeight="fontWeightMedium" noWrap>
                Location:
              </BodyTextLarge>
              <Box ml={1} className={classes.elipses}>
                <ToolTip title={location}>
                  <BodyTextLarge color="grey">{location}</BodyTextLarge>
                </ToolTip>
              </Box>
            </Box>
            <Box
              px={[4, 4, 8, 3]}
              mt={[1.8, 1.8, 1.8, 0]}
              display="flex"
              flexDirection={['row', 'column', 'row', 'row']}
            >
              <SearchOutlinedIcon color="secondary" />
              <BodyTextLarge color="grey" fontWeight="fontWeightMedium" noWrap>
                Department:
              </BodyTextLarge>
              <Box ml={1} className={classes.elipses}>
                <ToolTip title={department}>
                  <BodyTextLarge color="grey">{department}</BodyTextLarge>
                </ToolTip>
              </Box>
            </Box>
            <Box
              px={[4, 4, 8, 3]}
              mt={[1.8, 1.8, 1.8, 0]}
              display="flex"
              flexDirection={['row', 'column', 'row', 'row']}
            >
              <AlarmOutlinedIcon color="secondary" />
              <BodyTextLarge color="grey" fontWeight="fontWeightMedium" noWrap>
                Deadline:
              </BodyTextLarge>
              <Box ml={1}>
                <ToolTip title={expiryDate}>
                  <BodyTextLarge color="grey">{expiryDate}</BodyTextLarge>
                </ToolTip>
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
