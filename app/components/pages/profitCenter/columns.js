import React from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { useAuthContext } from '../../../context/authContext';
import { ROLES } from '../../../utils/constants';
import Show from '../../show';
import { navigateTo } from '../../../utils/helper';

const ActionButtons = ({ data }) => {
  const history = useHistory();
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();

  return (
    <>
      <Show IF={role === ROLES.ADMIN}>
        <>
          <Tooltip title="Detail">
            <IconButton>
              <VisibilityOutlinedIcon color="action" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigateTo(history, `/profit-center/edit/${data.id}`)
              }
            >
              <EditIcon color="secondary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </>
      </Show>
    </>
  );
};

export const headCells = [
  {
    field: 'address',
    type: 'string',
    headerName: 'Address',
    description: 'Address',
    sortable: true,
    flex: 1,
  },
  {
    field: 'centerNumber',
    type: 'number',
    headerName: 'Center Number',
    description: 'Center Number',
    sortable: true,
    flex: 1,
  },
  {
    field: 'centerName',
    type: 'string',
    headerName: 'Center Name',
    description: 'Center Name',
    sortable: false,
    flex: 1,
  },
  {
    field: 'faxNumber',
    type: 'number',
    headerName: 'Fax Number',
    description: 'Fax Number',
    sortable: false,
    flex: 1,
  },
  {
    field: 'cellPhone',
    type: 'number',
    headerName: 'Cell Phone',
    description: 'Cell Phone',
    sortable: false,
    flex: 1,
  },
  {
    field: 'managerName',
    type: 'string',
    headerName: 'Manager Name',
    description: 'Manager Name',
    sortable: false,
    flex: 1,
  },
  {
    field: 'actions',
    type: 'number',
    headerName: ' ',
    description: 'Actions',
    sortable: false,
    renderCell: ({ row }) => <ActionButtons data={row} />,
    width: 150,
  },
];
