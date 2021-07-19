import { withStyles } from '@material-ui/core/styles';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const MuiStyledGroupButton = withStyles({
  root: {
    width: '100%',
    justifyContent: 'flex-end',
  },
})(ToggleButtonGroup);
export default MuiStyledGroupButton;
