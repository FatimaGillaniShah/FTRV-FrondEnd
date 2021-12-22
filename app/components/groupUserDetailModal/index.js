import React, { memo } from 'react';
import { Box } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import MuiDialog from '../muiDialog';
import { BodyTextLarge } from '../typography';
import { DialogTitle } from './dialogTitle';
import { useStyles } from './style';

export const GroupUserDetailModal = ({
  groupUser: { fullName, department, location, title, groups },
  modal,
  onHandleClose,
}) => {
  const classes = useStyles();
  const userGroups = () =>
    groups?.map(
      (userGroup, index) =>
        `${userGroup.name}${index === groups.length - 1 ? '' : ', '}`
    );
  return (
    <>
      <MuiDialog
        open={modal}
        onClose={() => onHandleClose()}
        title={<DialogTitle title={fullName} onHandleClose={onHandleClose} />}
        classes={classes}
        maxWidth="sm"
        actionsDisplay={false}
      >
        <Box>
          <Box className={classes.background} py={3} px={6}>
            <BodyTextLarge color="dark">
              <LocationOnIcon color="secondary" /> {location}
            </BodyTextLarge>
          </Box>
          <Box display="flex" py={3} px={7}>
            <Box width={1 / 3}>
              <BodyTextLarge color="grey" noWrap>
                Department:
              </BodyTextLarge>
            </Box>
            <BodyTextLarge fontWeight="fontWeightMedium" color="dark">
              {department}
            </BodyTextLarge>
          </Box>
          <Divider classes={{ root: classes.dividerClass }} />

          <Box display="flex" py={3} px={7}>
            <Box width={1 / 3}>
              <BodyTextLarge color="grey" noWrap>
                Title:
              </BodyTextLarge>
            </Box>
            <BodyTextLarge fontWeight="fontWeightMedium" color="dark">
              {title}
            </BodyTextLarge>
          </Box>
          <Divider classes={{ root: classes.dividerClass }} />

          <Box display="flex" width={1} py={3} px={7}>
            <Box width="30%">
              <BodyTextLarge color="grey" noWrap>
                Groups:
              </BodyTextLarge>
            </Box>
            <Box width="70%" pl={4.5}>
              <BodyTextLarge fontWeight="fontWeightMedium" color="dark">
                {userGroups()}
              </BodyTextLarge>
            </Box>
          </Box>
          <Divider classes={{ root: classes.dividerClass }} />
        </Box>
      </MuiDialog>
    </>
  );
};

GroupUserDetailModal.propTypes = {
  groupUser: PropTypes.shape({
    user: PropTypes.string,
    location: PropTypes.string,
    department: PropTypes.string,
    designation: PropTypes.number,
    group: PropTypes.string,
  }),
  modal: PropTypes.bool.isRequired,
  onHandleClose: PropTypes.func.isRequired,
};

export default memo(GroupUserDetailModal);
