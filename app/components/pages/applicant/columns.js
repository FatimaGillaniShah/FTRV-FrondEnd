import React from 'react';
import { IconButton } from '@material-ui/core';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import { useAuthContext } from '../../../context/authContext';
import { ROLES } from '../../../utils/constants';
import Show from '../../show';

const ActionButtons = ({ applicant }) => {
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();

  const handleResumeDownload = (resumeUrl) => {
    window.open(resumeUrl, '_self');
  };
  return (
    <>
      <Show IF={role === ROLES.ADMIN}>
        <>
          <IconButton
            onClick={() => {
              handleResumeDownload(applicant.resume);
            }}
          >
            <Tooltip title="Resume">
              <DescriptionOutlinedIcon color="secondary" />
            </Tooltip>
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
    renderCell: ({ row }) => <ActionButtons applicant={row} />,
    width: 150,
  },
];