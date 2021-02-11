/**
 *
 * InputField
 *
 */

import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import OutlinedInput from '@material-ui/core/OutlinedInput';

export default function InputField(props) {
  const {
    placeholderText,
    Icon,
    inputType,
    inputID,
    onIconClick,
    iconID,
    appendIcon,
    prependIcon,
    fullWidth,
    variant,
    formControlProps
  } = props;

  return (
    <FormControl fullWidth={fullWidth} {...formControlProps}>
      <InputLabel htmlFor={inputID}>{placeholderText}</InputLabel>
      {variant == 'outlined' ? (
        <OutlinedInput
          id={inputID}
          type={inputType}
          {...props}
          endAdornment={
            Icon &&
            appendIcon && (
              <InputAdornment position="end">
                <IconButton id={iconID} onClick={onIconClick} {...props}>
                  <Icon />
                </IconButton>
              </InputAdornment>
            )
          }
          startAdornment={
            Icon &&
            prependIcon && (
              <InputAdornment position="start">
                <IconButton id={iconID} onClick={onIconClick} {...props}>
                  <Icon />
                </IconButton>
              </InputAdornment>
            )
          }
        />
      ) : (
        <Input
          id={inputID}
          type={inputType}
          {...props}
          endAdornment={
            Icon &&
            appendIcon && (
              <InputAdornment position="end">
                <IconButton id={iconID} onClick={onIconClick} {...props}>
                  <Icon />
                </IconButton>
              </InputAdornment>
            )
          }
          startAdornment={
            Icon &&
            prependIcon && (
              <InputAdornment position="start">
                <IconButton id={iconID} onClick={onIconClick} {...props}>
                  <Icon />
                </IconButton>
              </InputAdornment>
            )
          }
        />
      )}
    </FormControl>
  );
}
InputField.propTypes = {
  fullWidth: PropTypes.bool,
  placeholderText: PropTypes.string,
  Icon: PropTypes.object,
  inputType: PropTypes.string,
  inputID: PropTypes.string,
  onIconClick: PropTypes.func,
  iconID: PropTypes.string,
  appendIcon: PropTypes.bool,
  prependIcon: PropTypes.bool,
  fullWidth: PropTypes.bool,
  variant: PropTypes.string,
  formControlProps: PropTypes.object
};
InputField.defaultProps = {
  fullWidth: true
};

// Usage

/* <InputField
  placeholderText="Input Field"
  Icon={EmailIcon}
  inputType="text"
  onInputChange={handleChange}
  inputID="abc"
  onIconClick={handleChange}
  iconID="ad"
  Icon={EmailIcon}
  placeholderText="Email"
  appendIcon={true}
  prependIcon={false}
  formControlProps={{ fullWidth: true }}   
  ...otherProps
/>; */
