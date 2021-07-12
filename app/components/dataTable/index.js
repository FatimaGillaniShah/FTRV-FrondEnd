import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { DataGrid, GridOverlay } from '@material-ui/data-grid';
import Alert from '@material-ui/lab/Alert';
import { ROLES, PAGE_SIZE } from '../../utils/constants';
import { useStyles } from './styles';
import { useAuthContext } from '../../context/authContext';

function CustomNoRowsOverlay() {
  const classes = useStyles();
  return (
    <GridOverlay className={classes.gridOverlay}>
      <Alert severity="error" className={classes.label}>
        No data found
      </Alert>
    </GridOverlay>
  );
}
export function DataTable({
  rows,
  columns,
  selected,
  setSelected,
  onChangeSort,
  sortColumn,
  sortOrder,
  count,
  isServerSide,
  tableRowsPerPage,
  handleServerPageSize,
  handleServerPageNumber,
  matchUserIdWithIDS,
  disableSelectionOnClick,
  ...props
}) {
  const {
    user: {
      data: { role, id: currentUserID },
    },
  } = useAuthContext();

  const classes = useStyles();
  const [sortModel, setSortModel] = useState([
    { field: sortColumn || '', sort: sortOrder || 'asc' },
  ]);
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(tableRowsPerPage);

  function currentlySelected(selections) {
    if (selected !== selections.selectionModel) {
      setSelected(selections.selectionModel);
    }
  }
  const handleSortModelChange = (params) => {
    if (params.sortModel !== sortModel) {
      if (isServerSide) {
        setSortModel(params.sortModel);
        onChangeSort(params.sortModel[0].sort, params.sortModel[0].field);
      }
    }
  };
  const handleChangeRowsPerPage = (params) => {
    setRowsPerPage(params.pageSize);
    setPage(0);
    const currentPage = 1;
    handleServerPageNumber({
      currentPage,
    });
    if (isServerSide) {
      const rowPerPage = params.pageSize;
      handleServerPageSize({ rowPerPage });
    }
  };
  const handleChangePage = (params) => {
    setPage(params.page);
    if (isServerSide) {
      const currentPage = params.page + 1;
      handleServerPageNumber({
        currentPage,
      });
    }
  };
  return (
    <Box className={`${classes.root} ${classes.cell}`}>
      <DataGrid
        components={{
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        onSelectionModelChange={currentlySelected}
        selectionModel={[...selected]}
        columns={columns}
        rows={rows}
        autoHeight
        disableSelectionOnClick={disableSelectionOnClick}
        {...props}
        checkboxSelection={role === ROLES.ADMIN}
        disableColumnMenu
        isRowSelectable={(params) =>
          !(matchUserIdWithIDS && params?.row?.id === currentUserID)
        }
        sortModel={sortModel}
        sortingMode={isServerSide ? 'server' : 'client'}
        onSortModelChange={handleSortModelChange}
        sortingOrder={['asc', 'desc']}
        pageSize={rowsPerPage}
        paginationMode={isServerSide ? 'server' : 'client'}
        onPageSizeChange={handleChangeRowsPerPage}
        onPageChange={handleChangePage}
        page={page}
        rowCount={count}
        rowsPerPageOptions={[5, 10, 20]}
        hideFooterSelectedRowCount
        pagination
      />
    </Box>
  );
}

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  tableRowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  onChangeSort: PropTypes.func,
  sortOrder: PropTypes.string,
  sortColumn: PropTypes.string.isRequired,
  isServerSide: PropTypes.bool,
  matchUserIdWithIDS: PropTypes.bool,
  count: PropTypes.number.isRequired,
};
DataTable.defaultProps = {
  tableRowsPerPage: PAGE_SIZE,
  selected: [],
  matchUserIdWithIDS: false,
  isServerSide: false,
};

export default DataTable;
