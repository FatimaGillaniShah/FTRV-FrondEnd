import {
  createStyles,
  lighten,
  makeStyles,
  withStyles,
} from '@material-ui/core/styles';
import TableSortLabel from '@material-ui/core/TableSortLabel';

// TABLE STYLES

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  tableHead: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.textColor.main,
  },
  headCells: {
    color: theme.palette.textColor.main,
    '&:hover': {
      color: theme.palette.textColor.main,
    },
  },
  headLabel: {
    color: theme.palette.textColor.main,
    '&:hover': {
      color: lighten(theme.palette.secondary.light, 0.85),
    },
  },
}));

// TableSortLabel CUSTOM STYLING

const StyledTableSortLabel = withStyles((theme) =>
  createStyles({
    root: {
      color: 'white',
      '&:hover': {
        color: 'white',
      },
      '&$active': {
        color: 'white',
      },
    },
    active: {},
    icon: {
      color: 'inherit !important',
    },
  })
)(TableSortLabel);

export { useStyles, StyledTableSortLabel };
