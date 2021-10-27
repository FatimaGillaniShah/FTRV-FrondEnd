import { makeStyles } from '@material-ui/core/styles';
import img from '../../../images/photoBg.png';
import { colors } from '../../../theme/colors';

export const useStyles = makeStyles((theme) => ({
  avatarGrid: {
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${img})`,
    backgroundSize: 'cover',
    backgroundPosition: '100% 100%',
    padding: '5px',
  },
  cardText: {
    overflowWrap: 'break-word',
  },
  avatar: {
    border: '5px solid ',
    borderColor: colors.light,
    borderRadius: '50%',
    width: '76px',
    height: '76px',
    marginTop: theme.spacing(4),
    marginRight: theme.spacing(2),
  },
  personName: {
    display: 'inline-block',
  },
}));
