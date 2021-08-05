import React from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import { ROLES } from '../../utils/constants';
import { Modal, navigateTo } from '../../utils/helper';
import { useDeleteAnnouncement } from '../../hooks/announcement';
import { ToolTip } from '../../components';

const ActionButtons = ({ data, disabled }) => {
  const history = useHistory();
  const mutation = useDeleteAnnouncement();
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();

  const handleDeleteAnnouncements = () => {
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
            <EditIcon
              color="secondary"
              onClick={() =>
                navigateTo(history, `/announcement/edit/${data.id}`)
              }
            />
          </IconButton>
          <IconButton
            onClick={() => handleDeleteAnnouncements()}
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
    field: 'title',
    type: 'string',
    headerName: 'Title',
    description: 'Title',
    sortable: true,
    width: 150,
  },
  {
    field: 'description',
    type: 'string',
    headerName: 'Description',
    description: 'Description',
    sortable: true,
    renderCell: ({ row: { description } }) => <ToolTip title={description} />,
    width: 350,
  },
  {
    field: 'startTime',
    type: 'string',
    headerName: 'Start Time',
    description: 'Start Time',
    sortable: true,
    flex: 1,
  },
  {
    field: 'endTime',
    type: 'string',
    headerName: 'End Time',
    description: 'End Time',
    sortable: true,
    flex: 1,
  },
  {
    field: 'status',
    type: 'string',
    headerName: 'Status',
    description: 'Status',
    sortable: true,
    width: 150,
  },
  {
    field: 'priority',
    type: 'string',
    headerName: 'Priority',
    description: 'Priority',
    sortable: true,
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
    width: 200,
  },
];
