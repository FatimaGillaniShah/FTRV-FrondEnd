import React from 'react';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Checkbox } from '@material-ui/core';

const checkBoxIcon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const all = 'All';

export const renderOption = (
  option,
  state,
  selectedOptions,
  autoCompleteOptions
) => {
  const optionState = { ...state };
  const selectedIndex = selectedOptions.findIndex(
    (value) => value.name === all
  );
  const isAllSelected = selectedIndex > -1;
  const defaultOptions = selectedOptions.findIndex(
    (value) => value.id === option.id
  );
  const isDefaultOptionsExist = defaultOptions > -1;
  if (isDefaultOptionsExist) {
    optionState.selected = true;
  }
  const isAllOptionsSelected =
    selectedOptions.length === autoCompleteOptions?.length;
  if (isAllOptionsSelected || isAllSelected) {
    optionState.selected = true;
  } else if (selectedOptions === []) {
    optionState.selected = false;
  }
  return (
    <>
      <Checkbox
        icon={checkBoxIcon}
        indeterminate={
          !isAllOptionsSelected &&
          !isAllSelected &&
          option.name === all &&
          selectedOptions.length > 0
        }
        checkedIcon={checkedIcon}
        checked={optionState.selected}
      />
      {option.name}
    </>
  );
};
