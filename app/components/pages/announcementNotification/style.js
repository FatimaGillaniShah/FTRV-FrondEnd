import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mainBox: {
    backgroundColor: 'bisque',
    justifyContent: 'center',
    display: 'flex',
    width: '80%',
    height: '80%',
  },
  notificationBox: {
    alignSelf: 'center',
  },
  typographyBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  icon:{
    
  }
}));
export default useStyles;
