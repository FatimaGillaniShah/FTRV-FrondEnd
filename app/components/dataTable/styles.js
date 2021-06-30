import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { colors } from '../../theme/colors';

// Grid Styles

const useStyles = makeStyles((theme) => ({
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

export { useStyles, StyledTableSortLabel };
