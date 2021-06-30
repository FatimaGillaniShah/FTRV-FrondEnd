import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormHelperText, TextField } from '@material-ui/core';
import { useField } from 'formik';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { makeStyles } from '@material-ui/core/styles';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
  id,
  selectedLocation,
  getOptionSelected,
  ...props
}) {
  const useStyles = makeStyles({
    checkbox: {
      marginRight: 8,
    },
  });
  const classes = useStyles();
  const [field, meta] = useField(props);
  delete field.onChange;

  useEffect(() => {
    if (options) {
      options?.unshift({
        name: 'All',
      });
    }
  }, [options]);

  return (
    <>
      <Autocomplete
        id={id}
        limitTags={limitTags}
        options={options}
        defaultValue={defaultValue}
        multiple
        disableCloseOnSelect
        getOptionLabel={getOptionLabel}
        getOptionSelected={getOptionSelected}
        renderOption={(option, state) => {
          const selectedState = { ...state };
          if (selectedLocation) {
            selectedState.selected = true;
          } else if (
            defaultValue.find((location) => location.id === option.id)
          ) {
            selectedState.selected = true;
          }
          return (
            <>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                className={classes.checkbox}
                checked={selectedState.selected}
              />
              {option.name}
            </>
          );
        }}
        onChange={onHandleChange}
        renderInput={(params) => (
          <TextField
            variant={variant}
            label={label}
            placeholder={defaultValue.length > 0 ? '' : placeholder}
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
  variant: PropTypes.string,
  placeholder: PropTypes.string,
  limitTags: PropTypes.number,
  defaultValue: PropTypes.array,
};
MuiAutoComplete.defaultProps = {
  fullWidth: true,
  variant: 'outlined',
};
