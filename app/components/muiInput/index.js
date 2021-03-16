/**
 *
 * InputField
 *
 */

import {
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

const useStyles = makeStyles((theme) => ({
  label: {
    color: theme.palette.text.info,
  },
}));

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
  showInputLabel,
  ...props
}) {
  const [field, meta] = useField(props);
  const classes = useStyles();
  return (
    <FormControl
      fullWidth={fullWidth}
      error={meta.touched && meta.error}
      {...formControlProps}
      variant={variant}
    >
      {variant === 'outlined' ? (
        <>
          {showInputLabel && (
            <InputLabel htmlFor={inputID} className={classes.label}>
              {OutlinedInputPlaceholder}
            </InputLabel>
          )}
          <OutlinedInput
            label={showInputLabel ? OutlinedInputPlaceholder : undefined}
            id={inputID}
            type={inputType}
            disabled={isDisabled}
            placeholder={
              !showInputLabel &&
              OutlinedInputPlaceholder &&
              OutlinedInputPlaceholder
            }
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
  showInputLabel: PropTypes.bool,
};
InputField.defaultProps = {
  fullWidth: true,
  IconClickable: true,
  showInputLabel: true,
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
