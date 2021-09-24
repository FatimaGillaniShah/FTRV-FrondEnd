import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mainBox: {
    backgroundColor: theme.palette.bgColor.secondary,
    borderRadius: '6px',
    minHeight: '120px',
    '&:hover': {
      transition: 'all .3s',
      boxShadow:
        '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 4px 5px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
    },
  },
  icon: {
    fontSize: '3em',
    color: theme.palette.bgColor.secondary,
  },
  iconBox: {
    height: '3.5rem',
    borderRadius: '6px',
  },

  textBox: {
    overflowWrap: 'break-word',
  },
  closeAnnouncement: {
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.1) rotate(180deg)',
      transition: 'all .3s',
    },
  },
}));
export default useStyles;
