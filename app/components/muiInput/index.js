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
import Show from '../show';

const useStyles = makeStyles((theme) => ({
  label: {
    color: theme.palette.text.info,
  },
  inputColor: {
    color: theme.palette.text.dark,
  },
  inputIconCursor: {
    cursor: 'default',
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
  isIconClickable,
  OutlinedInputPlaceholder,
  helperText,
  showInputLabel,
  tabIndex,
  onClick,
  ...props
}) {
  const [field, meta] = useField(props);
  const classes = useStyles();
  return (
    <FormControl
      fullWidth={fullWidth}
      onClick={onClick}
      error={meta.touched && meta.error}
      {...formControlProps}
      variant={variant}
    >
      {variant === 'outlined' ? (
        <>
          <Show IF={showInputLabel}>
            <InputLabel htmlFor={inputID} className={classes.label}>
              {OutlinedInputPlaceholder}
            </InputLabel>
          </Show>
          <OutlinedInput
            label={showInputLabel ? OutlinedInputPlaceholder : undefined}
            id={inputID}
            type={inputType}
            disabled={isDisabled}
            classes={{ input: classes.inputColor }}
            placeholder={
              !showInputLabel &&
              OutlinedInputPlaceholder &&
              OutlinedInputPlaceholder
            }
            endAdornment={
              Icon &&
              appendIcon && (
                <InputAdornment position="end">
                  <IconButton
                    disabled={isDisabled}
                    id={iconID}
                    onClick={onIconClick}
                    tabIndex={tabIndex}
                    {...props}
                    disableFocusRipple={!isIconClickable}
                    disableRipple={!isIconClickable}
                    className={!isIconClickable && classes.inputIconCursor}
                  >
                    <Icon />
                  </IconButton>
                </InputAdornment>
              )
            }
            startAdornment={
              Icon &&
              prependIcon && (
                <InputAdornment position="start">
                  {isIconClickable ? (
                    <IconButton
                      id={iconID}
                      onClick={onIconClick}
                      tabIndex={tabIndex}
                      {...props}
                    >
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
          <InputLabel className={classes.label} htmlFor={inputID}>
            {placeholderText}
          </InputLabel>
          <Input
            id={inputID}
            type={inputType}
            disabled={isDisabled}
            classes={{ input: classes.inputColor }}
            endAdornment={
              Icon &&
              appendIcon && (
                <InputAdornment position="end">
                  <IconButton
                    disabled={isDisabled}
                    id={iconID}
                    onClick={onIconClick}
                    tabIndex={tabIndex}
                    {...props}
                    disableFocusRipple={!isIconClickable}
                    disableRipple={!isIconClickable}
                    className={!isIconClickable && classes.inputIconCursor}
                  >
                    <Icon />
                  </IconButton>
                </InputAdornment>
              )
            }
            startAdornment={
              Icon &&
              prependIcon && (
                <InputAdornment position="start">
                  {isIconClickable ? (
                    <IconButton
                      id={iconID}
                      onClick={onIconClick}
                      tabIndex={tabIndex}
                      {...props}
                    >
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

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  isDisabled: PropTypes.bool,
  placeholderText: PropTypes.string,
  Icon: PropTypes.object,
  inputType: PropTypes.string,
  inputID: PropTypes.string,
  onIconClick: PropTypes.bool,
  iconID: PropTypes.string,
  appendIcon: PropTypes.bool,
  prependIcon: PropTypes.bool,
  variant: PropTypes.string,
  formControlProps: PropTypes.object,
  OutlinedInputPlaceholder: PropTypes.string,
  isIconClickable: PropTypes.bool,
  showInputLabel: PropTypes.bool,
  tabIndex: PropTypes.number,
};
InputField.defaultProps = {
  fullWidth: true,
  isIconClickable: false,
  showInputLabel: true,
  tabIndex: -1,
};

export default memo(InputField);

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
