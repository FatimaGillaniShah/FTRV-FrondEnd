import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { useAuthContext } from '../../../context/authContext';
import { ROLES } from '../../../utils/constants';
import Show from '../../show';
import { navigateTo } from '../../../utils/helper';
import Tooltip from '@material-ui/core/Tooltip';
import { ProfitCenterDetailModal } from '../../profitCenterDetailsModal';

const ActionButtons = ({ data, disabled }) => {
  const history = useHistory();
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();
  const [openProfitCenterModal, setOpenProfitCenterModal] = useState(false);
  const handleProfitCenterModal = () => {
    setOpenProfitCenterModal(true);
  };

  const handleClose = () => {
    setOpenProfitCenterModal(false);
  };


  return (
    <>
      <Show IF={role === ROLES.ADMIN}>
        <>
          <Show IF={openProfitCenterModal}>
            <ProfitCenterDetailModal
              record={data}
              modal={openProfitCenterModal}
              onHandleClose={handleClose}
            />
          </Show>
          <Tooltip title='View Details'>
            <IconButton onClick={handleProfitCenterModal}>
              <VisibilityOutlinedIcon color='action' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Edit'>
            <IconButton
              disabled={disabled}
              onClick={() => navigateTo(history, `/ring-group/edit/${data.id}`)}
            >
              <EditIcon color='secondary' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete'>
            <IconButton disabled={disabled}>
              <DeleteIcon color='error' />
            </IconButton>
          </Tooltip>
        </>
      </Show>
    </>
  );
};

export const headCells = [
  {
    field: 'locationName',
    type: 'string',
    headerName: 'Location Name',
    description: 'Location Name',
    sortable: true,
    width: 200,
  },
  {
    field: 'location',
    type: 'string',
    headerName: 'Address',
    description: 'Address',
    sortable: true,
    flex: 1,
  },
  {
    field: 'profitCenterNumber',
    type: 'number',
    headerName: 'Profit Center Number',
    description: 'Profit Center Number',
    sortable: true,
    flex: 1,
  },
  {
    field: 'ProfitCenterName',
    type: 'string',
    headerName: 'Profit Center Name',
    description: 'Profit Center Name',
    sortable: false,
    flex: 1,
  },
  {
    field: 'faxNumber',
    type: 'number',
    headerName: 'Dealership Fax Number',
    description: 'Dealership Fax Number',
    sortable: false,
    flex: 1,
  },
  {
    field: 'phoneNumber',
    type: 'number',
    headerName: 'Phone Number',
    description: 'Phone Number',
    sortable: false,
    flex: 1,
  },
  {
    field: 'generalManagerName',
    type: 'string',
    headerName: 'General Manager Name',
    description: 'General Manager Name',
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
      <ActionButtons data={row} disabled={row.role === ROLES.ADMIN} />
    ),
    width: 150,
  },
];
