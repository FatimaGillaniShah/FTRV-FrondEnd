import { Box, Button, Link } from '@material-ui/core';
import React, { memo } from 'react';
import AddIcon from '@material-ui/icons/Add';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { H5 } from '../../typography';
import DocumentTabs from './documentTabs';
import NotExist from '../notExist/index';

export function Documents({ data, onHandleDelete, onHandleSortOrder }) {
  return (
    <>
      <Box pb={8} pt={3}>
        <H5> Documents </H5>
      </Box>
      <Box>
        <Link href="/documents/add" underline="none">
          <Button variant="contained" color="secondary" startIcon={<AddIcon />}>
            New Document
          </Button>
        </Link>
      </Box>
      {data.length > 0 ? (
        <Box my={8}>
          <DocumentTabs
            departments={data}
            onHandleDelete={onHandleDelete}
            onHandleSortOrder={onHandleSortOrder}
          />
        </Box>
      ) : (
        <NotExist
          Icon={FileCopyOutlinedIcon}
          description=" No Documents To Show"
        />
      )}
    </>
  );
}

export default memo(Documents);
