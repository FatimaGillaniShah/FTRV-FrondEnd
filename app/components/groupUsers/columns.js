import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import Show from '../show';
import { GroupUserDetailModal } from '../groupUserDetailModal/index';

const ActionButtons = ({ groupUser }) => {
  const [openGroupUserModal, setOpenGroupUserModal] = useState(false);
  const handleGroupUserModal = () => {
    setOpenGroupUserModal(true);
  };

  const handleClose = () => {
    setOpenGroupUserModal(false);
  };

  return (
    <>
      <Show IF={openGroupUserModal}>
        <GroupUserDetailModal
          groupUser={groupUser}
          modal={openGroupUserModal}
          onHandleClose={handleClose}
        />
      </Show>
      <Tooltip title="Details">
        <IconButton onClick={handleGroupUserModal}>
          <VisibilityOutlinedIcon color="action" />
        </IconButton>
      </Tooltip>
    </>
  );
};

export const getHeadCells = ({ match }) => {
  const columnHeads = {
    fullName: 'fullName',
    department: 'department',
    title: 'title',
    location: 'location',
    actions: 'actions',
  };
  const columns = [
    {
      field: 'fullName',
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
      sortable: false,
      flex: 1,
    },
    {
      field: 'location',
      type: 'string',
      headerName: 'Location',
      description: 'Location',
      sortable: false,
      flex: 1,
    },
    {
      field: 'title',
      type: 'string',
      headerName: 'Title',
      description: 'Title',
      sortable: false,
      flex: 1,
    },
    {
      field: 'group',
      type: 'string',
      headerName: 'Group',
      valueFormatter: ({ row: { groups } }) =>
        groups?.map((group) => group.name).join(', '),
      description: 'Group',
      sortable: false,
      flex: 1,
    },
    {
      field: 'actions',
      type: 'number',
      headerName: ' ',
      description: 'Actions',
      sortable: false,
      renderCell: ({ row }) => <ActionButtons groupUser={row} />,
      width: 150,
    },
  ];

  const longColumns = ['group'];
  const mediumColumns = ['fullName', 'department', 'title', 'location'];

  const shortColumns = ['actions'];
  columns.map((value) => {
    const column = value;
    if (column.field === columnHeads[column.field] && match) {
      if (longColumns.includes(column.field)) column.width = 280;
      else if (mediumColumns.includes(column.field)) column.width = 200;
      else if (shortColumns.includes(column.field)) column.width = 130;
      else column.width = 160;
    } else column.flex = 1;
    return column;
  });
  return columns;
};
