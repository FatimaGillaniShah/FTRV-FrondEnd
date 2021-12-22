import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@material-ui/core';

const MuiCheckbox = ({
  disabled,
  onHandleChange,
  checked,
  size,
  indeterminate,
}) => (
  <Checkbox
    disabled={disabled}
    size={size}
    onChange={onHandleChange}
    checked={checked}
    indeterminate={indeterminate}
  />
);
MuiCheckbox.propTypes = {
  onHandleChange: PropTypes.func,
  disabled: PropTypes.bool,
  size: PropTypes.string,
};
MuiCheckbox.defaultProps = {
  size: 'small',
};

export default MuiCheckbox;
