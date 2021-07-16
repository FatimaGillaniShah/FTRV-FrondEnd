import React, { memo } from 'react';
import PropTypes from 'prop-types';
import StyledToggleButton from '../muiStyledToggleButton';
import StyledGroupButton from '../muiStyledToggleGroupButton';

function MuiToggleButtonGroup({
  toggleValues,
  onHandleToggleChange,
  alignment,
}) {
  const children = toggleValues.map((toggleGroup) => (
    <StyledToggleButton value={toggleGroup.value}>
      {toggleGroup.label}
    </StyledToggleButton>
  ));
  return (
    <StyledGroupButton
      value={alignment}
      exclusive
      onChange={onHandleToggleChange}
    >
      {children}
    </StyledGroupButton>
  );
}
export default memo(MuiToggleButtonGroup);

MuiToggleButtonGroup.propTypes = {
  toggleValues: PropTypes.array,
  onHandleToggleChange: PropTypes.func,
  alignment: PropTypes.string,
};
