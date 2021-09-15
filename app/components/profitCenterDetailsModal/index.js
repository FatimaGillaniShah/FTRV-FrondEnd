import React, { memo } from 'react';
import { Box } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import MuiDialog from '../muiDialog';
import { BodyTextLarge } from '../typography';
import { DialogTitle } from './dialogTitle';
import { useStyles } from './style';

export const ProfitCenterDetailModal = ({
  profitCenter: {
    name,
    address,
    code,
    centerNo,
    contactNo,
    faxNo,
    managerName,
  },
  modal,
  onHandleClose,
}) => {
  const classes = useStyles();
  return (
    <>
      <MuiDialog
        open={modal}
        onClose={() => onHandleClose()}
        title={<DialogTitle title={name} onHandleClose={onHandleClose} />}
        classes={classes}
        maxWidth="sm"
        actionsDisplay={false}
      >
        <Box>
          <Box className={classes.background} py={3} px={6}>
            <BodyTextLarge color="dark">
              <LocationOnIcon color="secondary" /> {address}
            </BodyTextLarge>
          </Box>
          <Box display="flex" py={3} px={7}>
            <Box width={1 / 3}>
              <BodyTextLarge color="grey" noWrap>
                Code:
              </BodyTextLarge>
            </Box>
            <BodyTextLarge fontWeight="fontWeightMedium" color="dark">
              {code}
            </BodyTextLarge>
          </Box>
          <Divider classes={{ root: classes.dividerClass }} />

          <Box display="flex" py={3} px={7}>
            <Box width={1 / 3}>
              <BodyTextLarge color="grey" noWrap>
                Profit Center #:
              </BodyTextLarge>
            </Box>
            <BodyTextLarge fontWeight="fontWeightMedium" color="dark">
              {centerNo}
            </BodyTextLarge>
          </Box>
          <Divider classes={{ root: classes.dividerClass }} />

          <Box display="flex" py={3} px={7}>
            <Box width={1 / 3}>
              <BodyTextLarge color="grey" noWrap>
                Phone Number:
              </BodyTextLarge>
            </Box>
            <BodyTextLarge fontWeight="fontWeightMedium" color="dark">
              {contactNo}
            </BodyTextLarge>
          </Box>
          <Divider classes={{ root: classes.dividerClass }} />

          <Box display="flex" py={3} px={7}>
            <Box width={1 / 3}>
              <BodyTextLarge color="grey" noWrap>
                Fax Number:
              </BodyTextLarge>
            </Box>
            <BodyTextLarge fontWeight="fontWeightMedium" color="dark">
              {faxNo || '-'}
            </BodyTextLarge>
          </Box>
          <Divider classes={{ root: classes.dividerClass }} />

          <Box display="flex" py={3} px={7}>
            <Box width={1 / 3}>
              <BodyTextLarge color="grey" noWrap>
                General Manager:
              </BodyTextLarge>
            </Box>
            <BodyTextLarge fontWeight="fontWeightMedium" color="dark">
              {managerName || '-'}
            </BodyTextLarge>
          </Box>
          <Divider classes={{ root: classes.dividerClass }} />
        </Box>
      </MuiDialog>
    </>
  );
};

ProfitCenterDetailModal.propTypes = {
  profitCenter: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    code: PropTypes.string,
    centerNo: PropTypes.number,
    contactNo: PropTypes.string,
    faxNo: PropTypes.string,
    managerName: PropTypes.string,
  }),
  modal: PropTypes.bool.isRequired,
  onHandleClose: PropTypes.func.isRequired,
};

export default memo(ProfitCenterDetailModal);
