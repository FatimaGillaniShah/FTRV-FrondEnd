import React from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import { ROLES } from '../../utils/constants';
import { Modal } from '../../utils/helper';

const ActionButtons = ({ data }) => {
  const history = useHistory();
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();

  const handleDeleteLinks = () => {
    Modal.fire();
  };

  return (
    <>
      {role === ROLES.ADMIN && (
        <>
          <IconButton>
            <EditIcon
              color="secondary"
              onClick={() => history.push(`/useful-links/edit/${data.id}`)}
            />
          </IconButton>
          <IconButton onClick={() => handleDeleteLinks()}>
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
    label: 'Name',
    type: 'label',
  },
  {
    id: 'link',
    numeric: false,
    disablePadding: false,
    label: 'Links',
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
