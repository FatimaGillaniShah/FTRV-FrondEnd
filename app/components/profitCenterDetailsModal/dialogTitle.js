import React, { memo } from 'react';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { useStyles } from './style';
import { H5 } from '../typography';

export const DialogTitle = ({ title, onHandleClose }) => {
  const classes = useStyles();
  return (
    <>
      <MuiDialogTitle className={classes.root}>
        <H5 color="light">{title}</H5>
        <IconButton className={classes.closeButton} onClick={onHandleClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>
      </MuiDialogTitle>
    </>
  );
};

DialogTitle.propTypes = {
  title: PropTypes.string,
  onHandleClose: PropTypes.func,
};

export default memo(DialogTitle);
