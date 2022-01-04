import { makeStyles } from '@material-ui/core/styles';

// TABLE STYLES

const useStyles = makeStyles(() => ({
  alertPadding: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  icon: {
    cursor: 'not-allowed',
  },
}));

export { useStyles };
