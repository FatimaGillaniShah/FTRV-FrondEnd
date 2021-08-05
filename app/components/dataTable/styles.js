import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { colors } from '../../theme/colors';

// Grid Styles

const useStyles = makeStyles((theme) => ({
  root: {
    '& .row-disabled': {
      cursor: 'not-allowed',
    },
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.text.light,
      lineHeight: '62px !important',
      maxHeight: '62px !important',
      minHeight: '62px !important',

      '& .MuiCheckbox-root': {
        color: theme.palette.checkbox.secondary,
      },
    },
    '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': {
      outline: 'none !important',
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

    '& .MuiCheckbox-root': {
      color: theme.palette.checkbox.main,
    },
    '& .MuiDataGrid-sortIcon': {
      color: theme.palette.iconColor.default,
    },
    '& .MuiCheckbox-colorPrimary.Mui-disabled': {
      color: 'rgba(0, 0, 0, 0.26)',
    },
  },

  gridOverlay: {
    zIndex: 100,
  },
  label: {
    marginTop: theme.spacing(1),
    width: '100%',
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
