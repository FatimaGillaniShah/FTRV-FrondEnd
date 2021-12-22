import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    lineHeight: '24px',
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    '& .cellValue': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  popperBoxStyle: ({ width }) => ({
    height: 1,
    width,
    display: 'block',
    position: 'absolute',
    top: 0,
  }),
  popperStyle: ({ width }) => ({
    [theme.breakpoints.down('lg')]: {
      width,
    },
    [theme.breakpoints.down('md')]: {
      width: width <= 400 ? width : width / 2,
    },
    [theme.breakpoints.down('sm')]: {
      width: '70%',
    },
    margin: '0 auto',
    zIndex: 20,
  }),
  paperStyle: ({ wrapper }) => ({
    minHeight: wrapper.current?.offsetHeight - 3,
  }),
  textPadding: {
    padding: 8,
  },
}));
