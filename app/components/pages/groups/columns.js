import React from 'react';
import { Box, IconButton, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { Modal, navigateTo } from '../../../utils/helper';
import { useDeleteGroup } from '../../../hooks/group';
import RenderCellExpand from '../../muiDatagridCellPopup';
import { useSharedState } from '../../../hooks/sharedState';
import { keys } from '../../../state/queryKeys';

const useStyles = makeStyles(() => ({
  deleteIcon: {
    cursor: 'not-allowed',
  },
}));
const ActionButtons = ({ data }) => {
  const history = useHistory();
  const classes = useStyles();
  const { mutate, isLoading } = useDeleteGroup();
  const [selectedRow] = useSharedState(keys.selectedRow);
  const handleDelete = () => {
    Modal.fire().then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutate([data.id]);
      }
    });
  };

  const isDisabled = selectedRow?.length > 0;
  return (
    <>
      <Tooltip title="Edit">
        <IconButton
          onClick={() => navigateTo(history, `/groups/edit/${data.id}`)}
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
          <IconButton disabled={isLoading || isDisabled} onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      </Tooltip>
    </>
  );
};

export const headCells = ({ match, isWriteAllowed }) => {
  const columnHeads = {
    name: 'name',
    description: 'description',
    permissions: 'permissions',
    actions: 'actions',
  };
  const columns = [
    {
      field: 'name',
      type: 'string',
      headerName: 'Group Name',
      description: 'Group Name',
      sortable: true,
      renderCell: RenderCellExpand,
    },
    {
      field: 'description',
      type: 'string',
      headerName: 'Description',
      description: 'Group Description',
      sortable: true,
      renderCell: RenderCellExpand,
    },
    {
      field: 'permissions',
      type: 'string',
      headerName: 'Resources',
      description: 'Resources',
      sortable: false,
      renderCell: RenderCellExpand,
      valueFormatter: ({ row: { resources } }) =>
        resources
          ?.map(
            ({ name, permissions }) => `${name} (${permissions?.toString()})`
          )
          .join(', '),
      width: 1200,
    },
    {
      field: 'actions',
      type: 'number',
      headerName: ' ',
      description: 'Actions',
      sortable: false,
      hide: !isWriteAllowed,
      renderCell: ({ row }) => <ActionButtons data={row} />,
      width: 130,
    },
  ];
  const longColumns = ['permissions'];
  const mediumColumns = ['description'];

  const shortColumns = ['name'];
  columns?.map((value) => {
    const column = value;
    if (column.field === columnHeads[column.field] && match) {
      if (longColumns.includes(column.field)) column.width = 900;
      else if (mediumColumns.includes(column.field)) column.width = 330;
      else if (shortColumns.includes(column.field)) column.width = 150;
      else column.width = 160;
    } else if (shortColumns.includes(column.field)) column.width = 130;
    else if (mediumColumns.includes(column.field)) column.width = 350;
    else column.flex = 1;
    if (column.field === 'actions') column.width = 130;
    return column;
  });
  return columns;
};
