import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  mainBox: {
    backgroundColor: '#fbf7f5',
    justifyContent: 'center',
    display: 'flex',
    width: '75%',
    height: '75%',
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
  description: { fontSize: '13px', maxWidth: '150px', textAlign: 'center' },
}));
export default useStyles;
