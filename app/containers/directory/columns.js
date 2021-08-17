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
      data: { role, id: currentUserID },
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
      {role === ROLES.ADMIN && (
        <>
          <IconButton
            disabled={disabled}
            onClick={() => navigateTo(history, `/directory/edit/${data.id}`)}
          >
            <EditIcon color="secondary" />
          </IconButton>
          <IconButton onClick={() => handleDeleteUser()} disabled={disabled}>
            <DeleteIcon color="error" />
          </IconButton>
        </>
      )}
    </>
  );
};

export const headCells = [
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
    headerName: 'Designation',
    description: 'Designation',
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
    headerName: 'Cell Phone',
    description: 'Cell Phone',
    sortable: false,
    width: 110,
  },
  {
    field: 'actions',
    type: 'number',
    headerName: ' ',
    description: 'Actions',
    sortable: false,
    renderCell: ({ row }) => <ActionButtons data={row} />,
    width: 200,
  },
];
