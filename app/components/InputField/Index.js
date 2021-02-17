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

export default function InputField({
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
  formControlProps,
  IconClickable,
  OutlinedInputPlaceholder,
  ...props
}) {
  return (
    <FormControl fullWidth={fullWidth} {...formControlProps}>
      {variant == 'outlined' ? (
        <OutlinedInput
          id={inputID}
          type={inputType}
          placeholder={OutlinedInputPlaceholder}
          {...props}
          endAdornment={
            Icon &&
            appendIcon && (
              <InputAdornment position="end">
                {IconClickable ? (
                  <IconButton id={iconID} onClick={onIconClick} {...props}>
                    <Icon />
                  </IconButton>
                ) : (
                  <Icon />
                )}
              </InputAdornment>
            )
          }
          startAdornment={
            Icon &&
            prependIcon && (
              <InputAdornment position="start">
                {IconClickable ? (
                  <IconButton id={iconID} onClick={onIconClick} {...props}>
                    <Icon />
                  </IconButton>
                ) : (
                  <Icon />
                )}
              </InputAdornment>
            )
          }
        />
      ) : (
        <>
          <InputLabel htmlFor={inputID}>{placeholderText}</InputLabel>
          <Input
            id={inputID}
            type={inputType}
            {...props}
            endAdornment={
              Icon &&
              appendIcon && (
                <InputAdornment position="end">
                  {IconClickable ? (
                    <IconButton id={iconID} onClick={onIconClick} {...props}>
                      <Icon />
                    </IconButton>
                  ) : (
                    <Icon />
                  )}
                </InputAdornment>
              )
            }
            startAdornment={
              Icon &&
              prependIcon && (
                <InputAdornment position="start">
                  {IconClickable ? (
                    <IconButton id={iconID} onClick={onIconClick} {...props}>
                      <Icon />
                    </IconButton>
                  ) : (
                    <Icon />
                  )}
                </InputAdornment>
              )
            }
          />
        </>
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
  formControlProps: PropTypes.object,
  OutlinedInputPlaceholder: PropTypes.string
};
InputField.defaultProps = {
  fullWidth: true,
  IconClickable: true
};

// Usage

/* <InputField
  placeholderText="Input Field"
  OutlinedInputPlaceholder="Search"
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
