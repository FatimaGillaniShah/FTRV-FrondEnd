import React from 'react';
import { Box, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Tooltip from '@material-ui/core/Tooltip';
import { keys } from '../../state/queryKeys';
import { useSharedState } from '../../hooks/sharedState';
import { Modal, navigateTo } from '../../utils/helper';
import { useDeleteAnnouncement } from '../../hooks/announcement';
import { ToolTip } from '../../components';
import Show from '../../components/show';

const useStyles = makeStyles(() => ({
  deleteIcon: {
    cursor: 'not-allowed',
  },
}));

const ActionButtons = ({ data, isWriteAllowed }) => {
  const history = useHistory();
  const classes = useStyles();
  const [selectedRow] = useSharedState(keys.selectedRow);
  const mutation = useDeleteAnnouncement();

  const handleDeleteAnnouncements = () => {
    Modal.fire().then((result) => {
      if (result.isConfirmed) {
        mutation.mutate([data.id]);
      }
    });
  };
  const isDisabled = selectedRow?.length > 0;
  return (
    <Show IF={isWriteAllowed}>
      <Tooltip title="Edit">
        <IconButton
          onClick={() => navigateTo(history, `/announcement/edit/${data.id}`)}
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
            onClick={() => handleDeleteAnnouncements()}
            disabled={isDisabled}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      </Tooltip>
    </Show>
  );
};

export const getHeadCells = ({ isWriteAllowed }) => [
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
    hide: !isWriteAllowed,
    sortable: false,
    renderCell: ({ row }) => (
      <ActionButtons data={row} isWriteAllowed={isWriteAllowed} />
    ),
    width: 200,
  },
];
