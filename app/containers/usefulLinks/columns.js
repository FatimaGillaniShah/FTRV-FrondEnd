import React from 'react';
import { Box, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';
import { useHistory, useParams } from 'react-router-dom';
import { get } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { Modal, navigateTo } from '../../utils/helper';
import { useSharedState } from '../../hooks/sharedState';
import { keys } from '../../state/queryKeys';
import { useDeleteLink } from '../../hooks/usefulLink';

const useStyles = makeStyles(() => ({
  deleteIcon: {
    cursor: 'not-allowed',
  },
}));

const ActionButtons = ({ data }) => {
  const classes = useStyles();
  const { categoryId } = useParams();
  const [selectedRow] = useSharedState(keys.selectedRow);
  const history = useHistory();
  const mutation = useDeleteLink();

  const handleDeleteLinks = () => {
    Modal.fire().then((result) => {
      if (result.isConfirmed) {
        mutation.mutate([data.id]);
      }
    });
  };
  const isDisabled = selectedRow?.length > 0;

  return (
    <>
      <Tooltip title="Edit">
        <IconButton
          onClick={() =>
            navigateTo(
              history,
              `/link-categories/useful-links/${categoryId}/edit/${data.id}`
            )
          }
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
          <IconButton onClick={() => handleDeleteLinks()} disabled={isDisabled}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      </Tooltip>
    </>
  );
};
export const getHeadCells = ({ isWriteAllowed }) => [
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
    hide: !isWriteAllowed,
    sortable: false,
    renderCell: ({ row }) => <ActionButtons data={row} />,
    flex: 1,
  },
];
