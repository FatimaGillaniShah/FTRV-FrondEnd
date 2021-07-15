import { Box, Button, Link } from '@material-ui/core';
import React, { memo } from 'react';
import AddIcon from '@material-ui/icons/Add';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { H5 } from '../../typography';
import DocumentTabs from './documentTabs';
import { ROLES } from '../../../utils/constants';
import { useAuthContext } from '../../../context/authContext';
import Show from '../../show';

export function Documents({ data, onHandleDelete, onHandleSortOrder }) {
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();
  return (
    <>
      <Box pb={8} pt={3}>
        <H5> Documents </H5>
      </Box>
      {role === ROLES.ADMIN && (
        <Box mb={12}>
          <Link href="/documents/add" underline="none">
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
            >
              New Document
            </Button>
          </Link>
        </Box>
      )}
      <Show
        IF={data?.length > 0}
        Icon={FileCopyOutlinedIcon}
        description=" No Documents To Show"
      >
        <Box my={8}>
          <DocumentTabs
            departments={data}
            onHandleDelete={onHandleDelete}
            onHandleSortOrder={onHandleSortOrder}
          />
        </Box>
      </Show>
    </>
  );
}

export default memo(Documents);
