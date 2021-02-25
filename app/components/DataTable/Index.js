import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import EnhancedTableHead from './TableHead';
import { useStyles } from './styles';
import { CheckBox } from '../MuiCheckbox/Index';
import { getComparator, stableSort } from '../../utils/helper';

export function DataTable({ data, headCells, tableRowsPerPage }) {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(tableRowsPerPage);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(data);
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const mapRows = (row, isItemSelected, labelId) => (
    <>
      <TableCell padding="checkbox">
        <CheckBox
          checked={isItemSelected}
          inputProps={{ 'aria-labelledby': labelId }}
          onClick={(event) => handleClick(event, row.id)}
        />
      </TableCell>
      {headCells.map((header, index) =>
        header.type == 'action' ? (
          <TableCell align="right" key={index}>
            {header.buttons()}
          </TableCell>
        ) : (
          <TableCell
            padding={index == 0 ? 'none' : 'default'}
            align={header.numeric ? 'right' : 'left'}
            key={index}
          >
            {row[header.id]}
          </TableCell>
        )
      )}
    </>
  );
  return (
    <Box className={classes.root}>
      <Paper className={classes.paper}>
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
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
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
                    >
                      {mapRows(row, isItemSelected, labelId)}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
DataTable.propTypes = {
  headCells: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  tableRowsPerPage: PropTypes.number,
};
DataTable.defaultProps = {
  headCells: [],
  tableRowsPerPage: 5,
  data: [],
};

export default DataTable;

// USAGE

/* <DataTable data={data} headCells={headCells} /> */

// DUMMY DATA

// HEAD CELLS PROPS
// const headCells = [
//   {
//     id: 'name',
//     numeric: false,
//     disablePadding: true,
//     label: 'Name',
//     type: 'label'
//   },
//   {
//     id: 'department',
//     numeric: false,
//     disablePadding: false,
//     label: 'Department',
//     type: 'label'
//   },
//   {
//     id: 'designation',
//     numeric: false,
//     disablePadding: false,
//     label: 'Designation',
//     type: 'label'
//   },
//   {
//     id: 'emailID',
//     numeric: false,
//     disablePadding: false,
//     label: 'Email ID',
//     type: 'label'
//   },
//   {
//     id: 'ext',
//     numeric: true,
//     disablePadding: false,
//     label: 'Ext',
//     type: 'label'
//   },
//   {
//     id: 'cellPhone',
//     numeric: true,
//     disablePadding: false,
//     label: 'Cell Phone',
//     type: 'label'
//   },
//   {
//     id: 'actions',
//     numeric: true,
//     disablePadding: false,
//     label: '',
//     buttons: () => (
//       <>
//         <IconButton>
//           <EditIcon color="primary" />
//         </IconButton>
//         <IconButton>
//           <DeleteIcon color="error" />
//         </IconButton>
//       </>
//     ),
//     type: 'action'
//   }
// ];

// DATA PROPS
// const data = [
//   {
//     id: 1,
//     name: 'aCupcake1',
//     department: 'Information Technology',
//     designation: 'Software Engineer',
//     emailID: 'abc@m.com',
//     ext: 4.3,
//     cellPhone: 343223452
//   },
//   {
//     id: 2,
//     name: 'fCupcake2',
//     department: 'nformation Technology',
//     designation: 'oftware Engineer',
//     emailID: 'cbc@m.com',
//     ext: 4.3,
//     cellPhone: 343223452
//   },
//   {
//     id: 3,
//     name: 'eCupcake3',
//     department: 'formation Technology',
//     designation: 'ftware Engineer',
//     emailID: 'bbc@m.com',
//     ext: 4.3,
//     cellPhone: 343223452
//   },
//   {
//     id: 4,
//     name: 'Ctupcake4',
//     department: 'ormation Technology',
//     designation: 'tware Engineer',
//     emailID: 'dabc@m.com',
//     ext: 4.3,
//     cellPhone: 343223452
//   },
//   {
//     id: 5,
//     name: 'hCupcake5',
//     department: 'rmation Technology',
//     designation: 'ware Engineer',
//     emailID: 'eaebc@m.com',
//     ext: 4.3,
//     cellPhone: 343223452
//   },
//   {
//     id: 6,
//     name: 'wCupcake6',
//     department: 'mation Technology',
//     designation: 'are Engineer',
//     emailID: 'uabc@m.com',
//     ext: 4.3,
//     cellPhone: 343223452
//   }
// ];
