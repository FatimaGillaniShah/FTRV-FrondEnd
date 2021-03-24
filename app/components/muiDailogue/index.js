import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

export default function MuiDailogue({
  onClose,
  open,
  title,
  fullWidth,
  maxWidth,
  content,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onClose} color="primary" variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

MuiDailogue.propTypes = {
  fullWidth: PropTypes.bool,
  maxWidth: PropTypes.string,
};
MuiDailogue.defaultProps = {
  fullWidth: true,
  maxWidth: 'sm',
};
