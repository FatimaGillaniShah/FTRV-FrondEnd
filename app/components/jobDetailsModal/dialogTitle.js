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
  title,
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
        <Box width={1} display="flex" flexDirection="column" mb={3} mt={6}>
          <Box mb={1}>
            <H4 color="secondary">{title}</H4>
          </Box>
          <Box
            display="flex"
            flexDirection={['column', 'column', 'column', 'row']}
            mb={3}
            mt={[5, 5, 5, 1.5]}
            width={1}
          >
            <Box display="flex" flexDirection="row">
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
              px={[0, 0, 0, 3]}
              mt={[1.8, 1.8, 1.8, 0]}
              display="flex"
              flexDirection="row"
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
              px={[0, 0, 0, 3]}
              mt={[1.8, 1.8, 1.8, 0]}
              display="flex"
              flexDirection="row"
            >
              <AlarmOutlinedIcon color="secondary" />
              <BodyTextLarge color="grey" fontWeight="fontWeightMedium" noWrap>
                Due Date:
              </BodyTextLarge>
              <Box ml={1}>
                <ToolTip title={expiryDate}>
                  <BodyTextLarge color="grey">{expiryDate}</BodyTextLarge>
                </ToolTip>
              </Box>
            </Box>
          </Box>
          <Box mb={2} width={1}>
            <Show IF={applied || expired || !expired}>
              <Box display="flex" flexDirection="row">
                <Box ml={1}>
                  <Show IF={!expired}>
                    <MuiBadge color={colors.oliveGreen} badgeContent="active" />
                  </Show>
                </Box>
                <Box>
                  <Show IF={expired}>
                    <MuiBadge badgeContent="expired" color="error" />
                  </Show>
                </Box>
                <Box ml={1}>
                  <Show IF={applied} className={classes.multipleBadge}>
                    <MuiBadge badgeContent="applied" color={colors.info} />
                  </Show>
                </Box>
              </Box>
            </Show>
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
