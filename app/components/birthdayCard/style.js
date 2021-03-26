import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  backgroundgrid: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: '154px 160px',
    marginTop: '-85px',
  },
  textBox: {
    overflowWrap: 'break-word',
  },
  birthdayText: {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    },
  },
  imgStyle: {
    border: '5px solid ',
    borderColor: 'white',
    borderRadius: '50%',
    width: '76px',
    height: '76px',
  },
  inline: {
    display: 'inline',
  },
}));
