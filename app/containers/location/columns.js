import React from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useAuthContext } from '../../context/authContext';
import { ROLES } from '../../utils/constants';
import { Modal } from '../../utils/helper';
import { useDeleteLocation } from '../../hooks/location';

const ActionButtons = ({ data, setSelected, disabled }) => {
  const mutation = useDeleteLocation({ callbackFn: () => setSelected([]) });
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();
  const handleDeleteLocation = () => {
    Modal.fire().then((result) => {
      if (result.isConfirmed) {
        mutation.mutate([data.id]);
      }
    });
  };

  return (
    <>
      {role === ROLES.ADMIN && (
        <>
          <IconButton disabled={disabled}>
            <EditIcon color="secondary" />
          </IconButton>
          <IconButton
            onClick={() => handleDeleteLocation()}
            disabled={disabled}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </>
      )}
    </>
  );
};
export const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Location',
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
