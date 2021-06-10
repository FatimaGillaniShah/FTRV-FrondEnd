import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default function MuiAutoComplete({
  id,
  options,
  name,
  label,
  variant,
  placeholder,
  limitTags,
}) {
  return (
    <Autocomplete
      limitTags={limitTags}
      multiple
      id={id}
      options={options}
      renderInput={(params) => (
        <TextField
          name={name}
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
