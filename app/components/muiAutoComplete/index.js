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
  multiple,
  fullWidth,
  defaultValue,
  onHandleChange,
  loading,
  onHandleSearch,
  id,
  ...props
}) {
  const [field, meta] = useField(props);
  delete field.onChange;
  return (
    <>
      <Autocomplete
        id={id}
        limitTags={limitTags}
        loading={loading}
        options={options}
        defaultValue={defaultValue}
        multiple={multiple}
        getOptionLabel={getOptionLabel}
        onChange={onHandleChange}
        onInputChange={onHandleSearch}
        {...props}
        renderInput={(params) => (
          <TextField
            variant={variant}
            label={label}
            placeholder={placeholder}
            error={meta.touched && meta.error}
            {...params}
            {...field}
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
  id: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  onHandleChange: PropTypes.func,
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  variant: PropTypes.string,
  placeholder: PropTypes.string,
  limitTags: PropTypes.number,
  defaultValue: PropTypes.array,
  loading: PropTypes.bool,
};
MuiAutoComplete.defaultProps = {
  fullWidth: true,
  variant: 'outlined',
  multiple: true,
  loading: false,
};
