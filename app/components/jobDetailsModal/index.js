import React, { memo } from 'react';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'html-react-parser';
import { useHistory } from 'react-router-dom';
import MuiDialog from '../muiDialog';
import { ROLES } from '../../utils/constants';
import { useAuthContext } from '../../context/authContext';
import { useStyles } from './style';
import { BodyTextSmall } from '../typography';
import { navigateTo } from '../../utils/helper';
import { DialogTitle } from './dialogTitle';

export const JobDetailModal = ({
  id,
  expiryDate,
  jobDetail,
  modal,
  onHandleClose,
}) => {
  const { department, location, applied, expired, description } = jobDetail;
  const classes = useStyles();
  const history = useHistory();
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();

  const handleSubmit = () => {
    if (role === ROLES.ADMIN) {
      navigateTo(history, `/jobs/applicants/${id}`);
    } else {
      navigateTo(history, `/jobs/apply/${id}`);
    }
  };
  const disabled =
    (role === ROLES.USER && expired) || (role === ROLES.USER && applied);
  return (
    <>
      <MuiDialog
        open={modal}
        onClose={() => onHandleClose()}
        title={
          <DialogTitle
            expired={expired}
            department={department.name}
            location={location.name}
            expiryDate={expiryDate}
            onHandleClose={onHandleClose}
            applied={applied}
          />
        }
        onSubmit={handleSubmit}
        maxWidth="md"
        classes={classes}
        successButtonText={role === ROLES.ADMIN ? 'View Applicants' : 'Apply'}
        disabled={disabled}
      >
        <Box px={5} mt={5}>
          <BodyTextSmall color="grey">
            {ReactHtmlParser(description)}
          </BodyTextSmall>
        </Box>
      </MuiDialog>
    </>
  );
};

JobDetailModal.propTypes = {
  department: PropTypes.string,
  location: PropTypes.string,
  description: PropTypes.string,
  expiryDate: PropTypes.string,
};

export default memo(JobDetailModal);
