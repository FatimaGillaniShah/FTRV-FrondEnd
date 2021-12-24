import React from 'react';
import { Box, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import { get } from 'lodash';
import clsx from 'clsx';
import Tooltip from '@material-ui/core/Tooltip';
import { useAuthContext } from '../../context/authContext';
import { Modal, navigateTo } from '../../utils/helper';
import { useDeleteUser } from '../../hooks/user';
import { useSharedState } from '../../hooks/sharedState';
import { keys } from '../../state/queryKeys';
import { useStyles } from './styles';

const ActionButtons = ({ data }) => {
  const classes = useStyles();
  const history = useHistory();
  const {
    user: {
      data: { id: currentUserID },
    },
  } = useAuthContext();
  const [selectedRow] = useSharedState(keys.selectedRow);
  const { isAdmin } = data;
  const mutation = useDeleteUser();

  const handleDeleteUser = () => {
    Modal.fire().then((result) => {
      if (result.isConfirmed) {
        mutation.mutate([data.id]);
      }
    });
  };
  const isDisabled = selectedRow?.length > 0;
  const disabled = data.id === currentUserID || isAdmin;
  return (
    <Box
      className={disabled && classes.icon}
      display="flex"
      flexDirection="row"
    >
      <Tooltip title="Edit">
        <IconButton
          disabled={disabled}
          onClick={() => navigateTo(history, `/directory/edit/${data.id}`)}
        >
          <EditIcon color="secondary" />
        </IconButton>
      </Tooltip>

      <Tooltip title={isDisabled ? 'Disabled' : 'Delete'}>
        <Box
          className={clsx({
            [classes.deleteIcon]: isDisabled,
          })}
        >
          <IconButton
            onClick={() => handleDeleteUser()}
            disabled={disabled || isDisabled}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      </Tooltip>
    </Box>
  );
};
export const getHeadCells = ({ match, isWriteAllowed }) => {
  const columnHeads = {
    fullName: 'fullName',
    [`department.name`]: 'department.name',
    title: 'title',
    [`location.name`]: 'location.name',
    email: 'email',
    extension: 'extension',
    contactNo: 'contactNo',
    actions: 'actions',
  };
  const columns = [
    {
      field: 'fullName',
      type: 'string',
      headerName: 'Name',
      description: 'Name',
      sortable: true,
      flex: 1,
    },
    {
      field: 'department.name',
      type: 'string',
      headerName: 'Department',
      description: 'Department',
      sortable: true,
      valueFormatter: (params) => get(params.row, 'department.name'),
      width: 150,
    },
    {
      field: 'title',
      type: 'string',
      headerName: 'Title',
      description: 'Title',
      sortable: true,
      flex: 1,
    },
    {
      field: 'location.name',
      type: 'string',
      headerName: 'Location',
      description: 'Location',
      sortable: true,
      valueFormatter: (params) => get(params.row, 'location.name'),
      width: 200,
    },
    {
      field: 'email',
      type: 'string',
      headerName: 'Email ID',
      description: 'Email ID',
      sortable: true,
      width: 240,
    },
    {
      field: 'extension',
      type: 'number',
      headerName: 'Ext',
      description: 'Ext',
      sortable: false,
      width: 150,
    },
    {
      field: 'contactNo',
      type: 'number',
      headerName: 'Phone No.',
      description: 'Phone Number',
      sortable: false,
      width: 110,
    },
    {
      field: 'actions',
      type: 'number',
      headerName: ' ',
      description: 'Actions',
      hide: !isWriteAllowed,
      sortable: false,
      renderCell: ({ row }) => <ActionButtons data={row} />,
      width: 200,
    },
  ];

  const longColumns = ['email'];
  const mediumColumns = [
    'fullName',
    'department.name',
    'title',
    'location.name',
  ];

  const shortColumns = ['actions'];
  columns.map((value) => {
    const column = value;
    if (column.field === columnHeads[column.field] && match) {
      if (longColumns.includes(column.field)) column.width = 240;
      else if (mediumColumns.includes(column.field)) column.width = 200;
      else if (shortColumns.includes(column.field)) column.width = 130;
      else column.width = 160;
    } else column.flex = 1;
    return column;
  });
  return columns;
};
