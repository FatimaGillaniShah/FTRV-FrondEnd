import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormHelperText, TextField } from '@material-ui/core';
import { useField } from 'formik';

export default function MuiAutoComplete({
  options,
  label,
  getOptionLabel,
  variant,
  placeholder,
  limitTags,
  fullWidth,
  defaultValue,
  onHandleChange,
  ...props
}) {
  const [field, meta] = useField(props);
  return (
    <>
      <Autocomplete
        limitTags={limitTags}
        options={options}
        defaultValue={defaultValue}
        multiple
        getOptionLabel={getOptionLabel}
        onChange={onHandleChange}
        renderInput={(params) => (
          <TextField
            variant={variant}
            label={label}
            placeholder={placeholder}
            error={meta.error}
            {...params}
            {...field}
            {...props}
          />
        )}
      />
      {meta.touched && meta.error ? (
        <FormHelperText error>{meta.error}</FormHelperText>
      ) : null}
    </>
  );
}

MuiAutoComplete.propTypes = {
  fullWidth: PropTypes.bool,
  options: PropTypes.array,
  label: PropTypes.string,
  variant: PropTypes.string,
  placeholder: PropTypes.string,
  limitTags: PropTypes.number,
  getOptionLabel: PropTypes.func,
  defaultValue: PropTypes.array,
  onHandleChange: PropTypes.func,
};
MuiAutoComplete.defaultProps = {
  fullWidth: true,
  variant: 'outlined',
};
