import React from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import Show from '../../show';
import { Modal, navigateTo } from '../../../utils/helper';
import { useDeleteRingGroup } from '../../../hooks/ringGroup';

const ActionButtons = ({ data, isWriteAllowed }) => {
  const history = useHistory();
  const { mutate, isLoading } = useDeleteRingGroup();

  const handleDelete = () => {
    Modal.fire().then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutate([data.id]);
      }
    });
  };
  return (
    <Show IF={isWriteAllowed}>
      <IconButton
        disabled={isLoading}
        onClick={() => navigateTo(history, `/ring-group/edit/${data.id}`)}
      >
        <EditIcon color="secondary" />
      </IconButton>
      <IconButton disabled={isLoading} onClick={handleDelete}>
        <DeleteIcon color="error" />
      </IconButton>
    </Show>
  );
};

export const getHeadCells = ({ isWriteAllowed }) => [
  {
    field: 'name',
    type: 'string',
    headerName: 'Name',
    description: 'Name',
    sortable: true,
    width: 200,
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
      <ActionButtons data={row} isWriteAllowed={isWriteAllowed} />
    ),
    width: 150,
  },
];
