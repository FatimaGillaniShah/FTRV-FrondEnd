import React from 'react';
import { IconButton } from '@material-ui/core';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import Show from '../../show';

const ActionButtons = ({ applicant, isWriteAllowed }) => {
  const handleResumeDownload = (resumeUrl) => {
    window.open(resumeUrl, '_self');
  };
  return (
    <Show IF={isWriteAllowed}>
      <IconButton
        onClick={() => {
          handleResumeDownload(applicant.resume);
        }}
      >
        <Tooltip title="Resume">
          <DescriptionOutlinedIcon color="secondary" />
        </Tooltip>
      </IconButton>
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
    field: 'designation',
    type: 'string',
    headerName: 'Title',
    description: 'Title',
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
    hide: !isWriteAllowed,
    sortable: false,
    renderCell: ({ row }) => (
      <ActionButtons applicant={row} isWriteAllowed={isWriteAllowed} />
    ),
    width: 150,
  },
];
