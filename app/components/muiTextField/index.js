import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { colors } from '../../theme/colors';

const styles = () => ({
  inputLabel: {
    color: colors.dimGrey,
  },
});

function MuiTextField(props) {
  const { classes } = props;
  return (
    <TextField
      InputLabelProps={{
        classes: {
          root: classes.inputLabel,
        },
      }}
      {...props}
    />
  );
}

MuiTextField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MuiTextField);
