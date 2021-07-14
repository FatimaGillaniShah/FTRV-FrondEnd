import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { withStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';
import { navigateTo } from '../../utils/helper';
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

export function ToggleGroup({ initialValue }) {
  const history = useHistory();
  const [alignment, setAlignment] = React.useState(initialValue);

  const handleChange = (event, newAlignment) => {
    let alignmentValue = newAlignment;
    if (alignmentValue === null) {
      alignmentValue = 'directory';
      navigateTo(history, '/directory');
    }
    if (alignmentValue === 'directory') {
      navigateTo(history, '/directory');
    } else if (alignmentValue === 'ringGroup') {
      navigateTo(history, '/ring-group');
    }
    setAlignment(alignmentValue);
  };

  const children = [
    <StyledToggleButton value="directory">Directory</StyledToggleButton>,
    <StyledToggleButton value="ringGroup">Ring Group</StyledToggleButton>,
  ];
  return (
    <StyledGroupButton value={alignment} exclusive onChange={handleChange}>
      {children}
    </StyledGroupButton>
  );
}
export default ToggleGroup;
