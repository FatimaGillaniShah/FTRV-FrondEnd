import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import { useAuthContext } from '../../../context/authContext';
import { ROLES } from '../../../utils/constants';
import Show from '../../show';
import { Modal, navigateTo } from '../../../utils/helper';
import { useDeleteJob } from '../../../hooks/job';
import JobDetailModal from '../../../containers/jobDetailModal';
import { colors } from '../../../theme/colors';
import MuiStyledBadge from '../../muiStyledBadge';

const ActionButtons = ({ data }) => {
  const history = useHistory();
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();
  const [openJobModal, setOpenJobModal] = useState(false);
  const { mutate, isLoading } = useDeleteJob();

  const handleDelete = () => {
    Modal.fire().then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutate([data.id]);
      }
    });
  };

  const handleJobModal = () => {
    setOpenJobModal(true);
  };

  const handleClose = () => {
    setOpenJobModal(false);
  };

  return (
    <>
      <Show IF={openJobModal}>
        <JobDetailModal
          id={data.id}
          modal={openJobModal}
          onHandleClose={handleClose}
        />
      </Show>

      <IconButton disabled={isLoading} onClick={handleJobModal}>
        <VisibilityOutlinedIcon />
      </IconButton>
      <Show IF={role === ROLES.ADMIN}>
        <IconButton
          disabled={isLoading}
          onClick={() => navigateTo(history, `/jobs/edit/${data.id}`)}
        >
          <EditIcon color="secondary" />
        </IconButton>
        <IconButton disabled={isLoading} onClick={handleDelete}>
          <DeleteIcon color="error" />
        </IconButton>
      </Show>
    </>
  );
};
const StatusIcons = ({ data }) => (
  <>
    {data.expired ? (
      <Box ml={2}>
        <IconButton>
          <Badge badgeContent="expired" color="error" />
        </IconButton>
      </Box>
    ) : (
      <Box ml={2}>
        <IconButton>
          <MuiStyledBadge color={colors.oliveGreen} badgeContent="active" />
        </IconButton>
      </Box>
    )}
  </>
);
export const headCells = [
  {
    field: 'title',
    type: 'string',
    headerName: 'Title',
    description: 'Title',
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
    field: 'expiryDate',
    type: 'string',
    headerName: 'Expiry Date',
    description: 'Expiry Date',
    sortable: false,
    flex: 1,
  },
  {
    field: 'status',
    type: 'string',
    headerName: 'Status',
    description: 'Status',
    sortable: false,
    renderCell: ({ row }) => <StatusIcons data={row} />,
    width: 250,
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
    width: 150,
  },
];
