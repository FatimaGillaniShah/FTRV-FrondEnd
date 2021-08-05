import React from 'react';
import { IconButton } from '@material-ui/core';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import { useAuthContext } from '../../../context/authContext';
import { ROLES } from '../../../utils/constants';
import Show from '../../show';

const ActionButtons = ({ disabled }) => {
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();

  return (
    <>
      <Show IF={role === ROLES.ADMIN}>
        <>
          <IconButton disabled={disabled}>
            <DescriptionOutlinedIcon color="secondary" />
          </IconButton>
        </>
      </Show>
    </>
  );
};

export const headCells = [
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
    field: 'designation',
    type: 'string',
    headerName: 'Designation',
    description: 'Designation',
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
    field: 'emailId',
    type: 'string',
    headerName: 'Email Id',
    description: 'Email Id',
    sortable: false,
    flex: 1,
  },
  {
    field: 'resume',
    type: 'number',
    headerName: 'Resume',
    description: 'Actions',
    sortable: false,
    renderCell: ({ row }) => (
      <ActionButtons data={row} disabled={row.role === ROLES.ADMIN} />
    ),
    width: 150,
  },
];
