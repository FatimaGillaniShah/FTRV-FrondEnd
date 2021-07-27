import React from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../../../context/authContext';
import { ROLES } from '../../../utils/constants';
import Show from '../../show';
import { Modal, navigateTo } from '../../../utils/helper';
import { useDeleteRingGroup } from '../../../hooks/ringGroup';

const ActionButtons = ({ data, disabled, setSelected }) => {
  const history = useHistory();
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();
  const { mutate, isLoading } = useDeleteRingGroup({
    callbackFn: () => setSelected([]),
  });

  const handleDelete = () => {
    Modal.fire().then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutate([data.id]);
      }
    });
  };
  return (
    <>
      <Show IF={role === ROLES.ADMIN}>
        <>
          <IconButton
            disabled={isLoading || disabled}
            onClick={() => navigateTo(history, `/ring-group/edit/${data.id}`)}
          >
            <EditIcon color="secondary" />
          </IconButton>
          <IconButton disabled={isLoading || disabled} onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </>
      </Show>
    </>
  );
};

export const headCells = [
  {
    field: 'name',
    type: 'string',
    headerName: 'Name',
    description: 'Name',
    sortable: true,
    flex: 1,
  },
  {
    field: 'department',
    type: 'string',
    headerName: 'Department',
    description: 'Department',
    sortable: true,
    flex: 1,
  },
  {
    field: 'location',
    type: 'string',
    headerName: 'Location',
    description: 'Location',
    sortable: true,
    flex: 1,
  },
  {
    field: 'extension',
    type: 'number',
    headerName: 'Ext',
    description: 'Ext',
    sortable: false,
    flex: 1,
  },
  {
    field: 'actions',
    type: 'number',
    headerName: ' ',
    description: 'Actions',
    sortable: false,
    renderCell: ({ row }) => (
      <ActionButtons data={row} disabled={row.role === ROLES.ADMIN} />
    ),
    flex: 1,
  },
];
