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

export default function InputField(props) {
  const {
    placeholderText,
    Icon,
    inputType,
    inputID,
    onIconClick,
    iconID
  } = props;

  return (
    <FormControl>
      <InputLabel htmlFor={inputID}>{placeholderText}</InputLabel>
      <Input
        id={inputID}
        type={inputType}
        {...props}
        endAdornment={
          <InputAdornment position="start">
            <IconButton id={iconID} onClick={onIconClick} {...props}>
              {Icon && <Icon />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

// Usage

/* <InputField
  placeholderText="Input Field"
  Icon={EmailIcon}
  inputType="text"
  onInputChange={handleChange}
  inputID="abc"
  onIconClick={handleChange}
  iconID="ad"
  ...otherProps
/>; */
