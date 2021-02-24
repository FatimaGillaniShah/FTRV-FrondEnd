/**
 *
 * Button
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

export default function CustomButton(props) {
  const { btnText } = props;
  return <Button {...props}>{btnText}</Button>;
}

Button.propTypes = {
  fullWidth: PropTypes.bool,
  variant: PropTypes.string,
  color: PropTypes.string
};

Button.defaultProps = {
  fullWidth: true,
  variant: 'contained',
  color: 'primary'
};

// Usage

/* <CustomButton btnText="login" />*/
