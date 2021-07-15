import React, { memo } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { colors } from '../../theme/colors';

const StyledToggleButton = withStyles((theme) => ({
  root: {
    fontSize: theme.typography.pxToRem(13),
    lineHeight: '20px',
    letterSpacing: '0.25px',
    color: colors.secondary,
    backgroundColor: colors.skyBlue,
    borderRadius: '30px',
    padding: theme.spacing(3),
    width: '22%',
    '&$selected': {
      backgroundColor: colors.secondary,
      color: colors.light,
      '&:hover': {
        backgroundColor: colors.secondary,
        color: colors.light,
      },
    },
  },
  selected: {},
}))(ToggleButton);

const StyledGroupButton = withStyles({
  root: {
    width: '100%',
    justifyContent: 'flex-end',
  },
})(ToggleButtonGroup);

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
