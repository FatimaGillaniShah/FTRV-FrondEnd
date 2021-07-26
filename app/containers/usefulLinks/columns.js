import React from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory, useParams } from 'react-router-dom';
import { get } from 'lodash';
import { useAuthContext } from '../../context/authContext';
import { ROLES } from '../../utils/constants';
import { Modal, navigateTo } from '../../utils/helper';
import { useDeleteLink } from '../../hooks/usefulLink';

const ActionButtons = ({ data, setSelected, disabled }) => {
  const { categoryId } = useParams();
  const history = useHistory();
  const mutation = useDeleteLink({
    callbackFn: () => setSelected([]),
  });
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();

  const handleDeleteLinks = () => {
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
          <IconButton
            onClick={() =>
              navigateTo(
                history,
                `/link-categories/useful-links/${categoryId}/edit/${data.id}`
              )
            }
            disabled={disabled}
          >
            <EditIcon color="secondary" />
          </IconButton>
          <IconButton onClick={() => handleDeleteLinks()} disabled={disabled}>
            <DeleteIcon color="error" />
          </IconButton>
        </>
      )}
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
    field: 'url',
    type: 'string',
    headerName: 'Links',
    description: 'Links',
    sortable: true,
    renderCell: (params) => {
      const cellValue = get(params.row, 'url');
      return (
        <>
          <a
            href={
              cellValue?.includes('http') ? cellValue : `http://${cellValue}`
            }
            target="_blank"
          >
            {cellValue}
          </a>
        </>
      );
    },
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
