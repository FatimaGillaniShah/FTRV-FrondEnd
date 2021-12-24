import { makeStyles } from '@material-ui/core/styles';

// TABLE STYLES

const useStyles = makeStyles(() => ({
  alertPadding: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  deleteIcon: {
    cursor: 'not-allowed',
  },
}));

export { useStyles };
