import React from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import { get } from 'lodash';
import { useAuthContext } from '../../context/authContext';
import { ROLES } from '../../utils/constants';
import { Modal, navigateTo } from '../../utils/helper';
import { useDeleteUser } from '../../hooks/user';

const ActionButtons = ({ data }) => {
  const history = useHistory();
  const {
    user: {
      data: { id: currentUserID },
    },
  } = useAuthContext();

  const mutation = useDeleteUser();

  const handleDeleteUser = () => {
    Modal.fire().then((result) => {
      if (result.isConfirmed) {
        mutation.mutate([data.id]);
      }
    });
  };
  const disabled = data.id === currentUserID;
  return (
    <>
      <IconButton
        disabled={disabled}
        onClick={() => navigateTo(history, `/directory/edit/${data.id}`)}
      >
        <EditIcon color="secondary" />
      </IconButton>
      <IconButton onClick={handleDeleteUser} disabled={disabled}>
        <DeleteIcon color="error" />
      </IconButton>
    </>
  );
};

export const headCells = ({ role, match }) => {
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
    },
    {
      field: 'department.name',
      type: 'string',
      headerName: 'Department',
      description: 'Department',
      sortable: true,
      valueFormatter: (params) => get(params.row, 'department.name'),
    },
    {
      field: 'title',
      type: 'string',
      headerName: 'Title',
      description: 'Title',
      sortable: true,
    },
    {
      field: 'location.name',
      type: 'string',
      headerName: 'Location',
      description: 'Location',
      sortable: true,
      valueFormatter: (params) => get(params.row, 'location.name'),
    },
    {
      field: 'email',
      type: 'string',
      headerName: 'Email ID',
      description: 'Email ID',
      sortable: true,
    },
    {
      field: 'extension',
      type: 'number',
      headerName: 'Ext',
      description: 'Ext',
      sortable: false,
    },
    {
      field: 'contactNo',
      type: 'number',
      headerName: 'Phone No.',
      description: 'Phone Number',
      sortable: false,
    },
    {
      field: 'actions',
      type: 'number',
      headerName: ' ',
      description: 'Actions',
      hide: role === ROLES.USER,
      sortable: false,
      renderCell: ({ row }) => <ActionButtons data={row} />,
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
