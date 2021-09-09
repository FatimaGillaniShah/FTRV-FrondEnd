import React, { memo } from 'react';
import { Box } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Divider from '@material-ui/core/Divider';
import MuiDialog from '../muiDialog';
import { BodyTextLarge } from '../typography';
import { DialogTitle } from './dialogTitle';
import { useStyles } from './style';

export const ProfitCenterDetailModal = ({ record, modal, onHandleClose }) => {
  const classes = useStyles();

  return (
    <>
      <MuiDialog
        open={modal}
        onClose={() => onHandleClose()}
        title={
          <DialogTitle
            title={record?.locationName}
            onHandleClose={onHandleClose}
          />
        }
        classes={classes}
        maxWidth="sm"
        actionsDisplay={false}
      >
        <Box>
          <Box className={classes.background} py={3} px={6}>
            <BodyTextLarge color="dark">
              <LocationOnIcon color="secondary" /> {record?.location}
            </BodyTextLarge>
          </Box>
          <Box display="flex" py={3} px={7}>
            <Box width={1 / 3}>
              <BodyTextLarge color="grey" noWrap>
                Code:
              </BodyTextLarge>
            </Box>
            <BodyTextLarge fontWeight="fontWeightMedium" color="dark">
              {record?.ProfitCenterName}
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
              {record?.profitCenterNumber}
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
              {record?.phoneNumber}
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
              {record?.faxNumber}
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
              {record?.generalManagerName}
            </BodyTextLarge>
          </Box>
          <Divider classes={{ root: classes.dividerClass }} />
        </Box>
      </MuiDialog>
    </>
  );
};

ProfitCenterDetailModal.propTypes = {};

export default memo(ProfitCenterDetailModal);
