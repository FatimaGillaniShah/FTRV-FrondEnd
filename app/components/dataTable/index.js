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
  page,
  setPage,
  ...props
}) {
  const {
    user: {
      data: { role, id: currentUserID },
    },
  } = useAuthContext();

  const classes = useStyles();
  const [sortingModel, setSortingModel] = useState([
    { field: sortColumn || '', sort: sortOrder || 'asc' },
  ]);

  const [rowsPerPage, setRowsPerPage] = useState(tableRowsPerPage);

  function currentlySelected({ selectionModel }) {
    if (selected !== selectionModel) {
      setSelected(selectionModel);
    }
  }
  const handleSortModelChange = ({ sortModel }) => {
    if (sortModel !== sortingModel) {
      if (isServerSide) {
        setSortingModel(sortModel);
        onChangeSort(sortModel[0].sort, sortModel[0].field);
      }
      setSortingModel(sortModel);
    }
  };
  const handleChangeRowsPerPage = ({ pageSize }) => {
    setRowsPerPage(pageSize);
    setPage(0);
    const currentPage = 1;
    if (isServerSide) {
      handleServerPageNumber({
        currentPage,
      });
      const rowPerPage = pageSize;
      handleServerPageSize({ rowPerPage });
    }
  };
  const handleChangePage = ({ page: newPage }) => {
    setPage(newPage);
    if (isServerSide) {
      const currentPage = newPage + 1;
      handleServerPageNumber({
        currentPage,
      });
    }
  };
  return (
    <Box className={classes.root}>
      <DataGrid
        rowHeight={75}
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
        sortModel={sortingModel}
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
        getRowClassName={(params) => {
          if (matchUserIdWithIDS && params?.row?.id === currentUserID) {
            return `row-disabled`;
          }
          return '';
        }}
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
  disableSelectionOnClick: PropTypes.bool,
  matchUserIdWithIDS: PropTypes.bool,
  count: PropTypes.number.isRequired,
  page: PropTypes.number,
  setPage: PropTypes.func,
};
DataTable.defaultProps = {
  tableRowsPerPage: PAGE_SIZE,
  selected: [],
  matchUserIdWithIDS: false,
  isServerSide: false,
  disableSelectionOnClick: true,
  page: 0,
};

export default DataTable;
