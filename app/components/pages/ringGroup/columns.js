import React from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useAuthContext } from '../../../context/authContext';
import { ROLES } from '../../../utils/constants';

const ActionButtons = ({ disabled }) => {
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();

  return (
    <>
      {role === ROLES.ADMIN && (
        <>
          <IconButton disabled={disabled}>
            <EditIcon color="secondary" />
          </IconButton>
          <IconButton disabled={disabled}>
            <DeleteIcon color="error" />
          </IconButton>
        </>
      )}
    </>
  );
};

export const headCells = [
  {
    id: 'fullName',
    numeric: false,
    disablePadding: true,
    label: 'Name',
    type: 'label',
  },
  {
    id: 'department.name',
    numeric: false,
    disablePadding: false,
    label: 'Department',
    type: 'label',
  },
  {
    id: 'location.name',
    numeric: false,
    disablePadding: false,
    label: 'Location',
    type: 'label',
  },

  {
    id: 'extension',
    numeric: true,
    disablePadding: false,
    label: 'Ext',
    type: 'label',
  },

  {
    id: 'actions',
    numeric: true,
    disablePadding: false,
    label: '',
    buttons: ActionButtons,
    type: 'action',
  },
];
