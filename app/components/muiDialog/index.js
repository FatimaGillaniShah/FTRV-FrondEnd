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
import clsx from 'clsx';
import Show from '../show';
import { useStyles } from './style';

export default function MuiDialog({
  onClose,
  open,
  title,
  fullWidth,
  maxWidth,
  children,
  onSubmit,
  classes,
  successButton,
  disabled,
  actionsDisplay,
}) {
  const modalClasses = useStyles();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      <DialogTitle
        id="form-dialog-title"
        className={clsx(classes?.dialog, modalClasses.title)}
      >
        {title}
      </DialogTitle>
      <DialogContent className={classes?.dialogContent}>
        {children}
      </DialogContent>

      <Show IF={actionsDisplay}>
        <Box display="flex" px={1}>
          <DialogActions className={classes?.dialogActions}>
            {Array.isArray(successButton) ? (
              successButton.map((text) => (
                <Button
                  name={text}
                  onClick={(props) => onSubmit(props, text)}
                  type="submit"
                  color="secondary"
                  variant="contained"
                  disabled={disabled}
                >
                  {text}
                </Button>
              ))
            ) : (
              <Box pl={3}>
                <Button
                  name={successButton}
                  onClick={onSubmit}
                  type="submit"
                  color="secondary"
                  variant="contained"
                  disabled={disabled}
                >
                  {successButton}
                </Button>
              </Box>
            )}

            <Button onClick={onClose} color="secondary">
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
  successButton: PropTypes.string,
  disabled: PropTypes.bool,
  actionsDisplay: PropTypes.bool,
};
MuiDialog.defaultProps = {
  fullWidth: true,
  maxWidth: 'sm',
  successButton: 'Create',
  actionsDisplay: true,
};
