/**
 *
 * Select
 *
 */

import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import { useField } from 'formik';

export default function SelectInput({
  labelId,
  selectId,
  fullWidth,
  label,
  helperText,
  options,
  onHandleChange,
  selectedValue,
  selectName,
  formControlProps,
  ...props
}) {
  const [field, meta] = useField(props);
  return (
    <FormControl
      fullWidth={fullWidth}
      {...formControlProps}
      error={meta.error && true}
    >
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={selectId}
        onChange={onHandleChange}
        value={selectedValue}
        name={selectName}
        {...field}
        {...props}
        error={meta.error}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options &&
          options.map((val) =>
            val.value !== undefined ? (
              <MenuItem value={val.value}>{val.label}</MenuItem>
            ) : (
              <MenuItem value={val}>{val}</MenuItem>
            )
          )}
      </Select>

      <FormHelperText>{helperText}</FormHelperText>
      {meta.touched && meta.error ? (
        <FormHelperText error>{meta.error}</FormHelperText>
      ) : null}
    </FormControl>
  );
}

SelectInput.propTypes = {
  labelId: PropTypes.string,
  selectId: PropTypes.string,
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  helperText: PropTypes.string,
  options: PropTypes.array,
  onHandleChange: PropTypes.func,
  selectedValue: PropTypes.string,
  selectName: PropTypes.string,
  formControlProps: PropTypes.object,
};

SelectInput.defaultProps = {
  fullWidth: true,
};

// Usage

/* <Select
name="departments"
  labelId="label-id"
  selectId="select-id"
  fullWidth={true}
  label="Department"
  helperText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam pariatur accusantium fugit voluptatem dignissimos delectus accusamus facilis ullam nisi culpa."
  options={top100Films}
  onHandleChange={handleChange}
  selectedValue={value}
  selectName="department"
  ...otherProps
/> */