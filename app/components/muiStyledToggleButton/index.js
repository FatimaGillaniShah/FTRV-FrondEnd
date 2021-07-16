import { withStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { colors } from '../../theme/colors';

const MuiStyledToggleButton = withStyles((theme) => ({
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
export default MuiStyledToggleButton;
