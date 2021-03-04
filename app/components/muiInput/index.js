/**
 *
 * InputField
 *
 */

import React, { memo } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { FormHelperText } from '@material-ui/core';
import { useField } from 'formik';

function InputField({
  placeholderText,
  Icon,
  inputType,
  inputID,
  onIconClick,
  iconID,
  isDisabled,
  appendIcon,
  prependIcon,
  fullWidth,
  variant,
  formControlProps,
  IconClickable,
  OutlinedInputPlaceholder,
  helperText,
  ...props
}) {
  const [field, meta] = useField(props);
  return (
    <FormControl
      fullWidth={fullWidth}
      error={meta.touched && meta.error}
      {...formControlProps}
    >
      {variant === 'outlined' ? (
        <OutlinedInput
          id={inputID}
          type={inputType}
          disabled={isDisabled}
          placeholder={OutlinedInputPlaceholder}
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
          {...field}
          {...props}
        />
      ) : (
        <>
          <InputLabel htmlFor={inputID}>{placeholderText}</InputLabel>
          <Input
            id={inputID}
            type={inputType}
            disabled={isDisabled}
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
            {...field}
            {...props}
          />
        </>
      )}
      {meta.touched && meta.error ? (
        <FormHelperText error>{meta.error}</FormHelperText>
      ) : null}
    </FormControl>
  );
}

export default memo(InputField);

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  isDisabled: PropTypes.bool,
  placeholderText: PropTypes.string,
  Icon: PropTypes.object,
  inputType: PropTypes.string,
  inputID: PropTypes.string,
  onIconClick: PropTypes.func,
  iconID: PropTypes.string,
  appendIcon: PropTypes.bool,
  prependIcon: PropTypes.bool,
  variant: PropTypes.string,
  formControlProps: PropTypes.object,
  OutlinedInputPlaceholder: PropTypes.string,
  IconClickable: PropTypes.bool,
};
InputField.defaultProps = {
  fullWidth: true,
  IconClickable: true,
};

// Usage

/* <Input
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
