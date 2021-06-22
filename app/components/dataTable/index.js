import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { DataGrid } from '@material-ui/data-grid';
import { ROLES, PAGE_SIZE } from '../../utils/constants';
import { getComparator, stableSort } from '../../utils/helper';
import { CheckBox } from '../index';
import { BodyTextSmall } from '../typography';
import { useStyles, useStyles2 } from './styles';
import EnhancedTableHead from './tableHead';
import { useAuthContext } from '../../context/authContext';

export function DataTable({
  data,
  headCells,
  tableRowsPerPage,
  selected,
  setSelected,
  onChangeSort,
  sortOrder,
  sortColumn,
  isServerSide,
  matchUserIdWithIDS,
  count,
  handleServerPageNumber,
  handleServerPageSize,
}) {
  const classes = useStyles();
  const [order, setOrder] = useState(sortOrder || 'asc');
  const [orderBy, setOrderBy] = useState(sortColumn || '');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(tableRowsPerPage);
  const [rows, setRows] = useState([]);

  const {
    user: {
      data: { role, id: currentUserID },
    },
  } = useAuthContext();

  useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    onChangeSort(isAsc ? 'desc' : 'asc', property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows
        .filter((row) => (matchUserIdWithIDS ? row.id !== currentUserID : true))
        .map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  const isServerSidePagination = (paginationMode) => {
    if (!paginationMode) {
      return stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
    }
    return rows;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (isServerSide) {
      const currentPage = newPage + 1;
      handleServerPageNumber({
        currentPage,
      });
    }
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    const currentPage = 1;
    handleServerPageNumber({
      currentPage,
    });
    if (isServerSide) {
      const rowPerPage = parseInt(event.target.value, 10);
      handleServerPageSize({ rowPerPage });
    }
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const mapRows = (row, isItemSelected, labelId, currentUser) => (
    <>
      {role === ROLES.ADMIN && (
        <TableCell padding="checkbox">
          <CheckBox
            checked={isItemSelected}
            inputProps={{ 'aria-labelledby': labelId }}
            onClick={(event) => handleClick(event, row.id, currentUser)}
            disabled={currentUser}
          />
        </TableCell>
      )}

      {headCells.map((header) => {
        const Buttons = header.buttons || null;
        const cellValue = get(row, header.id.toString());
        return header.type === 'action' ? (
          <TableCell align="right">
            <Buttons
              data={row}
              disabled={currentUser}
              setSelected={setSelected}
            />
          </TableCell>
        ) : (
          <TableCell
            padding="default"
            align={header.numeric ? 'right' : 'left'}
          >
            <BodyTextSmall color="dark">
              {header.type === 'link' ? (
                <a
                  href={
                    cellValue?.includes('http')
                      ? cellValue
                      : `http://${cellValue}`
                  }
                  target="_blank"
                >
                  {cellValue}
                </a>
              ) : (
                cellValue
              )}
            </BodyTextSmall>
          </TableCell>
        );
      })}
    </>
  );
  return (
    <Box className={classes.root}>
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            headCells={headCells}
            role={role}
            currentUserID={currentUserID}
            rows={rows}
            matchUserIdWithIDS={matchUserIdWithIDS}
          />
          <TableBody>
            {isServerSidePagination(isServerSide).map((row, index) => {
              const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.name}
                  selected={isItemSelected}
                  disabled={matchUserIdWithIDS && row.id === currentUserID}
                >
                  {mapRows(
                    row,
                    isItemSelected,
                    labelId,
                    matchUserIdWithIDS && row.id === currentUserID
                  )}
                </TableRow>
              );
            })}
            {!rows.length && (
              <TableRow>
                <TableCell colSpan={headCells.length + 1}>
                  <Alert severity="error">No data found</Alert>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Box>
  );
}

const changeHeaderArray = (arr) =>
  arr.map((val) => ({
    field: val.id,
    headerName: val.label,
    editable: true,
    description: val.label,
    type: val.numeric && 'number',
    sortable: !val.numeric,
    flex: 1,
  }));

export function DataTable2({
  rows,
  columns,
  onChangeSort,
  sortColumn,
  sortOrder,
  count,
  isServerSide,
  tableRowsPerPage,
  handleServerPageSize,
  handleServerPageNumber,

  ...props
}) {
  const result = changeHeaderArray(columns);
  console.log('columns', columns);
  console.log('result', result);
  console.log('rows', rows);

  const [sortModel, setSortModel] = useState([
    { field: sortColumn || '', sort: sortOrder || 'asc' },
  ]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(tableRowsPerPage);

  const handleSortModelChange = (params) => {
    if (params.sortModel !== sortModel) {
      setSortModel(params.sortModel);
      onChangeSort(params.sortModel[0].sort, params.sortModel[0].field);
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

  const classes2 = useStyles2();
  return (
    <Box className={classes2.root}>
      <DataGrid
        columns={result}
        rows={rows}
        autoHeight
        pageSize={rowsPerPage}
        paginationMode="server"
        sortingMode="server"
        {...props}
        checkboxSelection
        disableColumnMenu
        sortModel={sortModel}
        sortingOrder={['asc', 'desc']}
        onSortModelChange={handleSortModelChange}
        onPageSizeChange={handleChangeRowsPerPage}
        onPageChange={handleChangePage}
        page={page}
        rowCount={count}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
      />
    </Box>
  );
}

DataTable.propTypes = {
  headCells: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
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

DataTable2.defaultProps = {
  tableRowsPerPage: PAGE_SIZE,
  selected: [],
  matchUserIdWithIDS: false,
  isServerSide: false,
};

export default DataTable;
