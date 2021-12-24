import React from 'react';
import { Box, IconButton } from '@material-ui/core';
import clsx from 'clsx';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import { Modal, navigateTo } from '../../utils/helper';
import { useDeleteLocation } from '../../hooks/location';
import { keys } from '../../state/queryKeys';
import { useSharedState } from '../../hooks/sharedState';
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
  const mutation = useDeleteLocation();
  const handleDeleteLocation = () => {
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
          onClick={() => navigateTo(history, `/locations/edit/${data.id}`)}
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
            onClick={() => handleDeleteLocation()}
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
