import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: 'column',
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
    padding: '2rem',
  },

  paper: {
    flex: 0.4,
  },
  headingGrid: {
    display: 'flex',
    [theme.breakpoints.down('xl')]: {
      justifyContent: 'flex-start',
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
  },
  templateDownloadGrid: {
    display: 'flex',
    [theme.breakpoints.down('xl')]: {
      justifyContent: 'flex-start',
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
  },
  templateDownloadBtn: {
    paddingLeft: 0,
    display: 'flex',
    alignItems: 'flex-end',
  },
  templateBtnIcon: {
    color: theme.palette.iconColor.secondary,
  },
  uploadFileGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xl')]: {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  uploadBtnBox: {
    display: 'flex',
    [theme.breakpoints.down('xl')]: {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  fileLabelBox: {
    alignItems: 'center',
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      marginTop: '1rem',
    },
  },
  submitBtn: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      marginTop: '2rem',
    },
  },
  circularProgress: {
    marginInline: '1rem',
  },
}));
