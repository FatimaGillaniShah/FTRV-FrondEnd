import React from 'react';
import { Box, Paper } from '@material-ui/core';
import { Document } from './document';
import { H5 } from '../../typography';
import { useStyles } from './style';

export default function DocumentList({
  documents,
  departmentName,
  onHandleDelete,
}) {
  const classes = useStyles();

  return (
    <Paper>
      <Box width={1}>
        <Paper>
          <Box py={5} mb={5} display={['none', 'none', 'block', 'block']}>
            <H5 align="center" bold>
              {departmentName}
            </H5>
          </Box>
        </Paper>
        <Box className={classes.documentList}>
          {documents?.map((document) => (
            <Document document={document} onHandleDelete={onHandleDelete} />
          ))}
        </Box>
      </Box>
    </Paper>
  );
}
