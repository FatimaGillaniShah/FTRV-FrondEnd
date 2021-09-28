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

    '& .MuiDataGrid-root .MuiDataGrid-row,.MuiDataGrid-root .MuiDataGrid-columnHeaderWrapper': {
      position: 'relative',
      overflow: 'visible',
    },
    '& .enableScroll .MuiDataGrid-row > div[data-field="actions"]': {
      position: 'sticky',
      right: 0,
      background: colors.bgColor.secondary,
      transition: 'all .2s ease-out',
      // boxShadow: '1px 2px 3px rgba(0,0,0,.5)',
      boxShadow:
        '0 2.8px 2.2px rgb(0 0 0 / 3%), 0 6.7px 5.3px rgb(0 0 0 / 5%), 0 12.5px 10px rgb(0 0 0 / 8%), 0 22.3px 17.9px rgb(0 0 0 / 10%), 0 41.8px 33.4px rgb(0 0 0 / 9%), 0 10px 10px rgb(0 0 0 / 12%)',
    },
    '& .enableScroll .MuiDataGrid-row:hover > div[data-field="actions"]': {
      background: colors.whiteSmoke,
    },
    '& .MuiDataGrid-root .MuiDataGrid-columnHeaderWrapper.scroll > div[data-field="actions"]': {
      position: 'sticky',
      background: colors.light,
      right: 0,
      transition: 'all .2s ease-out',
      boxShadow: '1px 2px 3px rgba(0,0,0,.5)',
      textAlign: 'center',
    },
    '& .MuiDataGrid-root .MuiDataGrid-columnHeaderWrapper > div[data-field="actions"]': {
      textAlign: 'center',
    },
    '& .MuiDataGrid-columnHeaderTitleContainer': {
      padding: 0,
    },
  },

  gridOverlay: {
    zIndex: 100,
    height: '70px',
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
