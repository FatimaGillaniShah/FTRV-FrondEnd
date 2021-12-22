import React, { memo } from 'react';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'html-react-parser';
import { useHistory } from 'react-router-dom';
import { Form, Formik } from 'formik';
import MuiDialog from '../muiDialog';
import { useAuthContext } from '../../context/authContext';
import { useStyles } from './style';
import { BodyTextSmall } from '../typography';
import { navigateTo } from '../../utils/helper';
import { DialogTitle } from './dialogTitle';
import Show from '../show';
import { Loading } from '../loading';

export const JobDetailModal = ({
  id,
  expiryDate,
  jobDetail,
  modal,
  onHandleClose,
  isJobLoading,
  permissions: { isApplyAllowed, isApplicantAllowed },
}) => {
  const {
    department,
    location,
    applied,
    expired,
    description,
    title,
  } = jobDetail;
  const classes = useStyles();
  const history = useHistory();
  const {
    user: {
      data: { isAdmin },
    },
  } = useAuthContext();
  const { viewApplicant, apply } = {
    apply: 'Apply',
    viewApplicant: 'View Applicants',
  };

  const handleSubmit = (e, name) => {
    if (isApplicantAllowed && name === viewApplicant) {
      navigateTo(history, `/jobs/applicants/${id}`);
    } else if (isApplyAllowed && name === apply) {
      navigateTo(history, `/jobs/apply/${id}`);
    }
  };
  const disabled = applied || isJobLoading || expired;
  const buttonText = [];
  if (isApplyAllowed) {
    buttonText.push(apply);
  }
  if (isApplicantAllowed) {
    buttonText.push(viewApplicant);
  }

  return (
    <>
      <Formik onSubmit={handleSubmit}>
        {() => (
          <Form>
            <MuiDialog
              open={modal}
              onClose={() => onHandleClose()}
              title={
                <Show IF={!isJobLoading}>
                  <DialogTitle
                    title={title}
                    expired={expired}
                    department={department.name}
                    location={location.name}
                    expiryDate={expiryDate}
                    onHandleClose={onHandleClose}
                    applied={applied}
                  />
                </Show>
              }
              onSubmit={handleSubmit}
              maxWidth="md"
              classes={classes}
              successButton={buttonText}
              disabled={!isAdmin && disabled}
            >
              <Show IF={isJobLoading}>
                <Loading />
              </Show>
              <Show IF={!isJobLoading}>
                <Box px={5} mt={5}>
                  <BodyTextSmall color="grey">
                    {ReactHtmlParser(description)}
                  </BodyTextSmall>
                </Box>
              </Show>
            </MuiDialog>
          </Form>
        )}
      </Formik>
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
