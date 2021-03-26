import React from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import { ROLES } from '../../utils/constants';

const ActionButtons = ({ data, disabled }) => {
  const history = useHistory();
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
            <EditIcon
              color="secondary"
              onClick={() => history.push(`announcement/edit/${data.id}`)}
            />
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
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Title',
    type: 'label',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Description',
    type: 'label',
  },
  {
    id: 'expiry',
    numeric: false,
    disablePadding: false,
    label: 'Expiry Date',
    type: 'label',
  },
  {
    id: 'start',
    numeric: false,
    disablePadding: false,
    label: 'Start Date',
    type: 'label',
  },
  {
    id: 'end',
    numeric: false,
    disablePadding: false,
    label: 'End Date',
    type: 'label',
  },
  {
    id: 'priority',
    numeric: false,
    disablePadding: false,
    label: 'Priority',
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
