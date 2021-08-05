import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Show from '../show';

export default function MuiDialog({
  onClose,
  open,
  title,
  fullWidth,
  maxWidth,
  children,
  onSubmit,
  classes,
  successButtonText,
  expired,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      <DialogTitle id="form-dialog-title" className={classes?.dialog}>
        {title}
      </DialogTitle>
      <DialogContent className={classes?.content}>{children}</DialogContent>
      <Show IF={!expired}>
        <Box display="flex" px={5}>
          <DialogActions className={classes?.dialogActions}>
            <Button
              onClick={onSubmit}
              type="submit"
              color="primary"
              variant="contained"
            >
              {successButtonText}
            </Button>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Show>
    </Dialog>
  );
}

MuiDialog.propTypes = {
  fullWidth: PropTypes.bool,
  maxWidth: PropTypes.string,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.element,
  successButtonText: PropTypes.string,
  expired: PropTypes.bool,
};
MuiDialog.defaultProps = {
  fullWidth: true,
  maxWidth: 'sm',
  successButtonText: 'Create',
  expired: false,
};
