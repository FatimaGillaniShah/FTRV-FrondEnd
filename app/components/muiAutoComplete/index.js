import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormHelperText, TextField } from '@material-ui/core';
import { useField } from 'formik';
import { isFunction } from '../../utils/helper';

export default function MuiAutoComplete({
  options,
  label,
  getOptionLabel,
  variant,
  placeholder,
  limitTags,
  multiple,
  fullWidth,
  onHandleReset,
  defaultValue,
  onHandleChange,
  loading,
  onHandleSearch,
  id,
  ...props
}) {
  const [field, meta, helpers] = useField(props);

  useEffect(() => {
    if (defaultValue) {
      helpers.setValue(defaultValue.id);
    }
  }, [defaultValue]);

  const handleInputChange = (e, event, newInputValue, reason) => {
    if (reason === 'clear') {
      helpers.setValue(null);
      if (isFunction(onHandleReset)) onHandleReset();
    } else {
      onHandleSearch(e);
    }
  };

  const renderInput = (params) => (
    <TextField
      variant={variant}
      label={label}
      placeholder={placeholder}
      error={meta.touched && meta.error}
      {...params}
      {...field}
    />
  );

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
        onInputChange={handleInputChange}
        {...props}
        renderInput={renderInput}
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
