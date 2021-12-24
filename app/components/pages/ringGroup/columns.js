import React from 'react';
import { Box, IconButton } from '@material-ui/core';
import clsx from 'clsx';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Show from '../../show';
import { Modal, navigateTo } from '../../../utils/helper';
import { useSharedState } from '../../../hooks/sharedState';
import { keys } from '../../../state/queryKeys';
import { useDeleteRingGroup } from '../../../hooks/ringGroup';

const useStyles = makeStyles(() => ({
  deleteIcon: {
    cursor: 'not-allowed',
  },
}));

const ActionButtons = ({ data, isWriteAllowed }) => {
  const classes = useStyles();
  const history = useHistory();
  const [selectedRow] = useSharedState(keys.selectedRow);
  const { mutate, isLoading } = useDeleteRingGroup();

  const handleDelete = () => {
    Modal.fire().then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutate([data.id]);
      }
    });
  };
  const isDisabled = selectedRow?.length > 0;
  return (
    <Show IF={isWriteAllowed}>
      <IconButton
        disabled={isLoading}
        onClick={() => navigateTo(history, `/ring-group/edit/${data.id}`)}
      >
        <EditIcon color="secondary" />
      </IconButton>
      <Box
        className={clsx({
          [classes.deleteIcon]: isDisabled,
        })}
      >
        <IconButton disabled={isLoading || isDisabled} onClick={handleDelete}>
          <DeleteIcon color="error" />
        </IconButton>
      </Box>
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
