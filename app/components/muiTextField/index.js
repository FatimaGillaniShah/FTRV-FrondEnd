import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  label: {
    color: theme.palette.text.info,
  },
  inputColor: {
    color: theme.palette.text.dark,
  },
}));

function MuiTextField(props) {
  const classes = useStyles();
  return (
    <TextField
      {...props}
      InputLabelProps={{
        classes: {
          root: classes.label,
          input: classes.inputColor,
        },
      }}
    />
  );
}

MuiTextField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default memo(MuiTextField);
