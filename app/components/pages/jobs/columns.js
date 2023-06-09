import React, { useState } from 'react';
import { Box, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import clsx from 'clsx';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import { useSharedState } from '../../../hooks/sharedState';
import { keys } from '../../../state/queryKeys';
import Show from '../../show';
import { Modal, navigateTo } from '../../../utils/helper';
import { useDeleteJob } from '../../../hooks/job';
import JobDetailModal from '../../../containers/jobDetailModal';
import { colors } from '../../../theme/colors';
import { MuiBadge } from '../../index';

const useStyles = makeStyles(() => ({
  deleteIcon: {
    cursor: 'not-allowed',
  },
}));

const ActionButtons = ({ jobs, isWriteAllowed }) => {
  const classes = useStyles();
  const history = useHistory();
  const [openJobModal, setOpenJobModal] = useState(false);
  const [selectedRow] = useSharedState(keys.selectedRow);
  const { mutate, isLoading } = useDeleteJob();

  const handleDelete = () => {
    Modal.fire().then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutate([jobs.id]);
      }
    });
  };
  const handleJobModal = () => {
    setOpenJobModal(true);
  };

  const handleClose = () => {
    setOpenJobModal(false);
  };
  const isDisabled = selectedRow?.length > 0;
  return (
    <>
      <Show IF={openJobModal}>
        <JobDetailModal
          id={jobs.id}
          modal={openJobModal}
          onHandleClose={handleClose}
        />
      </Show>
      <Tooltip title="View Details">
        <IconButton disabled={isLoading} onClick={handleJobModal}>
          <VisibilityOutlinedIcon color="action" />
        </IconButton>
      </Tooltip>
      <Show IF={isWriteAllowed}>
        <Tooltip title="Edit">
          <IconButton
            disabled={isLoading}
            onClick={() => navigateTo(history, `/jobs/edit/${jobs.id}`)}
          >
            <EditIcon color="secondary" />
          </IconButton>
        </Tooltip>
        <Tooltip title={isDisabled ? 'Disabled' : 'Delete'}>
          <Box
            className={clsx({
              [classes.deleteIcon]: isDisabled,
            })}
          >
            <IconButton
              disabled={isLoading || isDisabled}
              onClick={handleDelete}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        </Tooltip>
      </Show>
    </>
  );
};
const StatusIcons = ({ jobs }) => (
  <>
    {jobs.expired ? (
      <Box ml={6}>
        <Badge badgeContent="expired" color="error" />
      </Box>
    ) : (
      <Box>
        <MuiBadge color={colors.oliveGreen} badgeContent="active" />
      </Box>
    )}
  </>
);
export const getHeadCells = ({ isWriteAllowed }) => [
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
    headerName: 'Due Date',
    description: 'Expiry Date',
    sortable: false,
    flex: 1,
  },
  {
    field: '',
    type: 'string',
    headerName: '',
    description: 'Status',
    sortable: false,
    renderCell: ({ row }) => <StatusIcons jobs={row} />,
    width: 250,
  },
  {
    field: 'actions',
    type: 'number',
    headerName: ' ',
    description: 'Actions',
    sortable: false,
    renderCell: ({ row }) => (
      <ActionButtons jobs={row} isWriteAllowed={isWriteAllowed} />
    ),
    width: 150,
  },
];
