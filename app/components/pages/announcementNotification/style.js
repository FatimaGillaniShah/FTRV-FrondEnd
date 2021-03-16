import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  mainBox: {
    backgroundColor: 'white',
    justifyContent: 'center',
    display: 'flex',
    width: '80%',
    height: '80%',
    borderRadius: '6px',
  },
  notificationBox: {
    alignSelf: 'center',
  },
  typographyBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: '3em',
    color: 'white',
  },
  iconBox: {
    backgroundColor: '#e5433f',
    height: '3.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
    width: '70%',
  },
  titleBox: {
    marginBottom: '7px',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '16px',
  },
  description: { fontSize: '13px' },
}));
export default useStyles;
