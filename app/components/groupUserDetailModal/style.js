import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../theme/colors';

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(0),
    color: colors.light,
  },
  dialog: {
    backgroundColor: colors.secondary,
    padding: theme.spacing(3.5, 6.5),
  },
  dividerClass: {
    background: colors.lightGrey,
    margin: theme.spacing(0, 7),
  },
  dialogContent: {
    padding: theme.spacing(0, 0, 6),
  },
  background: {
    backgroundColor: colors.seaBlue,
  },
  icon: {
    fontSize: '2rem',
  },
}));
