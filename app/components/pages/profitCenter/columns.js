import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import { useAuthContext } from '../../../context/authContext';
import { ROLES } from '../../../utils/constants';
import Show from '../../show';
import { Modal, navigateTo } from '../../../utils/helper';
import { ProfitCenterDetailModal } from '../../profitCenterDetailsModal';
import { useDeleteProfitCenter } from '../../../hooks/profitCenter';

const ActionButtons = ({ profitCenter }) => {
  const { id } = profitCenter;
  const history = useHistory();
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();
  const { mutate } = useDeleteProfitCenter();
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

  return (
    <>
      <Show IF={role === ROLES.ADMIN}>
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
        <Tooltip title="Edit">
          <IconButton
            onClick={() => navigateTo(history, `/profit-center/edit/${id}`)}
          >
            <EditIcon color="secondary" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Tooltip>
      </Show>
    </>
  );
};

export const headCells = [
  {
    field: 'centerNumber',
    headerName: 'Center Number',
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
    flex: 1,
  },
  {
    field: 'faxNumber',
    type: 'number',
    headerName: 'Fax Number',
    description: 'Fax Number',
    sortable: true,
    flex: 1,
  },
  {
    field: 'contactNo',
    type: 'string',
    headerName: 'Cell Phone',
    description: 'Cell Phone',
    sortable: true,
    width: 150,
  },
  {
    field: 'actions',
    type: 'number',
    headerName: ' ',
    description: 'Actions',
    sortable: false,
    renderCell: ({ row }) => <ActionButtons profitCenter={row} />,
    width: 150,
  },
];
