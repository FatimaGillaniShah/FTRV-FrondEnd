import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Field } from 'formik';

export default function MuiAutoComplete({
  id,
  options,
  name,
  label,
  value,
  getOptionLabel,
  variant,
  placeholder,
  limitTags,
  component,
  onHandleChange,
}) {
  return (
    <Autocomplete
      id={id}
      name={name}
      limitTags={limitTags}
      multiple
      options={options}
      value={value}
      getOptionLabel={getOptionLabel}
      onChange={onHandleChange}
      renderInput={(params) => (
        <Field
          component={component}
          {...params}
          variant={variant}
          label={label}
          placeholder={placeholder}
        />
      )}
    />
  );
}

MuiAutoComplete.propTypes = {
  id: PropTypes.string,
  options: PropTypes.array,
  name: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
  placeholder: PropTypes.string,
};
