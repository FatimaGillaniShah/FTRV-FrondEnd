import React, { useState } from 'react';
import { Box, IconButton } from '@material-ui/core';
import clsx from 'clsx';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import Show from '../../show';
import { Modal, navigateTo } from '../../../utils/helper';
import { ProfitCenterDetailModal } from '../../profitCenterDetailsModal';
import { useDeleteProfitCenter } from '../../../hooks/profitCenter';
import { useSharedState } from '../../../hooks/sharedState';
import { keys } from '../../../state/queryKeys';

const useStyles = makeStyles(() => ({
  deleteIcon: {
    cursor: 'not-allowed',
  },
}));

const ActionButtons = ({ profitCenter, isWriteAllowed }) => {
  const classes = useStyles();
  const { id } = profitCenter;
  const history = useHistory();

  const { mutate } = useDeleteProfitCenter();
  const [selectedRow] = useSharedState(keys.selectedRow);
  const [openProfitCenterModal, setOpenProfitCenterModal] = useState(false);
  const handleProfitCenterModal = () => {
    setOpenProfitCenterModal(true);
  };

  const handleClose = () => {
    setOpenProfitCenterModal(false);
  };
  const handleDelete = () => {
    Modal.fire().then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutate([id]);
      }
    });
  };
  const isDisabled = selectedRow?.length > 0;
  return (
    <>
      <Show IF={openProfitCenterModal}>
        <ProfitCenterDetailModal
          profitCenter={profitCenter}
          modal={openProfitCenterModal}
          onHandleClose={handleClose}
        />
      </Show>
      <Tooltip title="Details">
        <IconButton onClick={handleProfitCenterModal}>
          <VisibilityOutlinedIcon color="action" />
        </IconButton>
      </Tooltip>
      <Show IF={isWriteAllowed}>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => navigateTo(history, `/profit-center/edit/${id}`)}
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
            <IconButton disabled={isDisabled} onClick={handleDelete}>
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        </Tooltip>
      </Show>
    </>
  );
};
export const getHeadCells = ({ isWriteAllowed }) => [
  {
    field: 'centerNo',
    headerName: 'Center No.',
    description: 'Center Number',
    sortable: true,
    width: 150,
  },
  {
    field: 'name',
    type: 'string',
    headerName: 'Center Name',
    description: 'Center Name',
    width: 150,
    sortable: true,
  },
  {
    field: 'managerName',
    type: 'string',
    headerName: 'Manager Name',
    description: 'Manager Name',
    sortable: true,
    flex: 1,
  },
  {
    field: 'code',
    type: 'string',
    headerName: 'Code',
    description: 'Code',
    sortable: true,
    flex: 1,
  },
  {
    field: 'address',
    type: 'string',
    headerName: 'Address',
    description: 'Address',
    sortable: true,
    width: 250,
  },
  {
    field: 'faxNo',
    type: 'string',
    headerName: 'Fax No.',
    description: 'Fax Number',
    sortable: false,
    flex: 1,
  },
  {
    field: 'contactNo',
    type: 'string',
    headerName: 'Phone No.',
    description: 'Phone Number',
    sortable: false,
    width: 150,
  },
  {
    field: 'actions',
    type: 'number',
    headerName: ' ',
    description: 'Actions',
    sortable: false,
    renderCell: ({ row }) => (
      <ActionButtons profitCenter={row} isWriteAllowed={isWriteAllowed} />
    ),
    width: 150,
  },
];
