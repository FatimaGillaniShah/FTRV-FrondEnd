import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../theme/colors';

const useStyles = makeStyles((theme) => ({
  mainBox: {
    backgroundColor: theme.palette.bgColor.secondary,
    borderRadius: '6px',
  },
  icon: {
    fontSize: '3em',
    color: theme.palette.bgColor.secondary,
  },
  iconBox: {
    backgroundColor: colors.textColor.error,
    height: '3.5rem',
    borderRadius: '6px',
  },

  textBox: {
    overflowWrap: 'break-word',
  },
}));
export default useStyles;
