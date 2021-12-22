import React from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import { Modal, navigateTo } from '../../utils/helper';
import { useDeleteLocation } from '../../hooks/location';
import Show from '../../components/show';

const ActionButtons = ({ data, isWriteAllowed }) => {
  const history = useHistory();
  const mutation = useDeleteLocation();
  const handleDeleteLocation = () => {
    Modal.fire().then((result) => {
      if (result.isConfirmed) {
        mutation.mutate([data.id]);
      }
    });
  };

  return (
    <Show IF={isWriteAllowed}>
      <IconButton
        onClick={() => navigateTo(history, `/locations/edit/${data.id}`)}
      >
        <EditIcon color="secondary" />
      </IconButton>
      <IconButton onClick={() => handleDeleteLocation()}>
        <DeleteIcon color="error" />
      </IconButton>
    </Show>
  );
};
export const getHeadCells = ({ isWriteAllowed }) => [
  {
    field: 'name',
    type: 'string',
    headerName: 'Location',
    description: 'Location',
    sortable: true,
    flex: 1,
  },

  {
    field: 'actions',
    type: 'number',
    headerName: ' ',
    description: 'Actions',
    sortable: false,
    hide: !isWriteAllowed,
    renderCell: ({ row }) => (
      <ActionButtons data={row} isWriteAllowed={isWriteAllowed} />
    ),
    flex: 1,
  },
];
