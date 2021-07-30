import React, { memo, useState } from 'react';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'html-react-parser';
import MuiDialog from '../muiDialog';
import { useStyles } from './style';
import { BodyTextSmall } from '../typography';
import { DialogTitle } from './dialogTitle';

export const JobDetailModal = ({
  department,
  location,
  description,
  expiryDate,
}) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MuiDialog
        open={open}
        onClose={() => handleClose()}
        title={
          <DialogTitle
            department={department}
            location={location}
            expiryDate={expiryDate}
            onHandleClose={handleClose}
          />
        }
        maxWidth="lg"
        classes={classes}
        successButtonText="View Applicants"
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
