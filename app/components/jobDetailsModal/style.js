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
    marginBottom: theme.spacing(10),
    marginLeft: theme.spacing(7),
    marginTop: theme.spacing(8),
  },
  icon: {
    fontSize: '2rem',
  },
  badge: {
    width: '4rem',
    marginTop: theme.spacing(3),
  },
  viewButton: {
    height: '2.5rem',
    width: '9rem',
  },
  lineBreak: {
    inlineSize: '70px',
    wordBreak: 'break-word',
    hyphens: 'auto',
  },
  dateLineBreak: {
    inlineSize: '80px',
    wordBreak: 'break-word',
  },
}));
