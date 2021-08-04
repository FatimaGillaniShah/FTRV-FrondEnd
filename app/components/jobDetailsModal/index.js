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
  department,
  location,
  description,
  expiryDate,
  modal,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();

  const handleClose = () => {
    navigateTo(history, `/jobs`);
  };
  const handleChange = () => {
    navigateTo(history, `/jobs/applicant/add/${id}`);
  };
  return (
    <>
      <MuiDialog
        open={modal}
        onClose={() => handleClose()}
        title={
          <DialogTitle
            department={department}
            location={location}
            expiryDate={expiryDate}
            onHandleClose={handleClose}
          />
        }
        onSubmit={handleChange}
        maxWidth="lg"
        classes={classes}
        successButtonText={role === ROLES.ADMIN ? 'View Applicants' : 'Apply'}
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
