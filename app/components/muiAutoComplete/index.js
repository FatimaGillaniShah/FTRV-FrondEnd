import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormHelperText } from '@material-ui/core';
import { useField } from 'formik';
import { isArray, remove, isObject } from 'lodash';
import { isFunction } from '../../utils/helper';
import TextField from '../muiTextField';
import { renderOption } from './renderOptions';

export default function MuiAutoComplete({
  options: autoCompleteOptions,
  label,
  variant,
  placeholder,
  onHandleReset,
  setFieldValue,
  multiple,
  defaultOptions,
  checkBox,
  onHandleChange,
  optionLabel,
  onHandleSearch,
  limitTags,
  usersLoading,
  ...props
}) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [field, meta, helpers] = useField(props);
  const [options, setOptions] = useState(autoCompleteOptions);
  const all = 'All';
  useEffect(() => {
    if (isArray(defaultOptions)) {
      if (defaultOptions?.length > 0) {
        setFieldValue(props.name, defaultOptions);
        setSelectedOptions(defaultOptions);
      }
    } else if (isObject(defaultOptions) && !multiple) {
      helpers.setValue(defaultOptions);
    }
  }, [defaultOptions]);
  useEffect(() => {
    if (autoCompleteOptions?.length > 0) {
      if (!checkBox) {
        setOptions(autoCompleteOptions);
      } else {
        const isAllNotExist =
          options?.filter((option) => option.id === 0).length === 0;
        if (isAllNotExist) {
          const optionsInfo = [...autoCompleteOptions];
          optionsInfo.unshift({ id: 0, name: 'All' });
          setOptions(optionsInfo);
        }
      }
    }
  }, [options, autoCompleteOptions]);

  const handleInputChange = (event, newInputValue, reason) => {
    if (reason === 'clear') {
      helpers.setValue(null);
      if (isFunction(onHandleReset)) onHandleReset();
    } else if (isFunction(onHandleSearch)) onHandleSearch(event);
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

  const handleChange = (e, value) => {
    const optionIds = value.map((option) => option.id);
    const duplicateOption = value.filter(({ id }, index) =>
      optionIds.includes(id, index + 1)
    );
    const isDuplicateOption = duplicateOption.length > 0;
    if (isDuplicateOption) {
      remove(value, (option) => option.id === duplicateOption[0].id);
    }
    const isAllSelected = value[0]?.name === all;
    const isAllExist = value[value.length - 1]?.name === all;
    if (isAllSelected) {
      setFieldValue(props.name, options.slice(1));
      setSelectedOptions(value);
    } else if (isAllExist) {
      setFieldValue(props.name, []);
      setSelectedOptions([]);
    } else if (value) {
      setFieldValue(props.name, value);
      setSelectedOptions(value);
    }
  };
  delete field.onChange;
  return (
    <>
      <Autocomplete
        options={options || []}
        getOptionLabel={(option) => option[optionLabel]}
        onChange={checkBox ? handleChange : onHandleChange}
        multiple={multiple}
        limitTags={limitTags}
        loading={usersLoading}
        disableCloseOnSelect={multiple}
        onInputChange={handleInputChange}
        {...props}
        value={field.value}
        renderInput={renderInput}
        renderOption={
          checkBox &&
          ((option, state) =>
            renderOption(option, state, selectedOptions, autoCompleteOptions))
        }
      />
      {meta.touched && meta.error ? (
        <FormHelperText error>{meta.error}</FormHelperText>
      ) : null}
    </>
  );
}

MuiAutoComplete.propTypes = {
  options: PropTypes.array.isRequired,
  onHandleChange: PropTypes.func,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  variant: PropTypes.string,
  placeholder: PropTypes.string,
  limitTags: PropTypes.number,
  defaultValue: PropTypes.array,
  checkBox: PropTypes.bool,
  optionLabel: PropTypes.string,
};
MuiAutoComplete.defaultProps = {
  variant: 'outlined',
  multiple: true,
  checkBox: true,
  limitTags: 2,
  optionLabel: 'name',
};
