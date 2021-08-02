import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../theme/colors';

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(2),
    color: colors.secondary,
  },
  content: {
    height: '36rem',
  },
  dialog: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(8),
  },
  dividerColor: {
    background: colors.black,
  },
  dialogActions: {
    marginBottom: theme.spacing(20),
    marginLeft: theme.spacing(7),
    marginTop: theme.spacing(8),
  },
  icon: {
    fontSize: '2rem',
  },
}));
