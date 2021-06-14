import {
  createStyles,
  lighten,
  makeStyles,
  withStyles,
} from '@material-ui/core/styles';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { colors } from '../../theme/colors';

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
    minWidth: 1050,
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
    color: theme.palette.text.light,
  },
  headCells: {
    color: theme.palette.text.main,
    '&:hover': {
      color: theme.palette.text.main,
    },
  },
  headLabel: {
    color: theme.palette.text.light,
    '&:hover': {
      color: lighten(theme.palette.secondary.light, 0.85),
    },
  },
}));

// Grid Styles

const useStyles2 = makeStyles((theme) => ({
  root: {
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: theme.palette.primary.light,
      lineHeight: '52px !important',
      maxHeight: '52px !important',
      minHeight: '52px !important',
    },
    '& .MuiDataGrid-window': {
      backgroundColor: colors.bgColor.secondary,
    },
    '& .MuiDataGrid-columnSeparator': { display: 'none' },
    '& .super-app.paid': {
      color: colors.green,
    },
    '& .super-app.open': {
      color: colors.green,
    },
    '& .super-app.redeemed': {
      color: colors.green,
    },
    '& .super-app.sold': {
      color: colors.red,
    },
    '& .super-app.adjudicated': {
      color: colors.red,
    },
    '& .super-app.closed': {
      color: colors.red,
    },
    '& .super-app.unpaid': {
      color: colors.grey,
    },
    '& .super-app.pending': {
      color: colors.grey,
    },
    '& .super-app.reviewed': {
      color: colors.orange,
    },
    '& .MuiDataGrid-footer': {
      justifyContent: 'center',
    },
  },
}));

// TableSortLabel CUSTOM STYLING

const StyledTableSortLabel = withStyles(() =>
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

export { useStyles, useStyles2, StyledTableSortLabel };
