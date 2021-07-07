import React from 'react';
import { Box, Paper } from '@material-ui/core';
import { useQuery } from 'react-query';
import { Document } from './document';
import { H5 } from '../../typography';
import { getDocuments } from '../../../state/queryFunctions';
import { keys } from '../../../state/queryKeys';
import { useStyles } from './style';

export default function DocumentList({
  departmentName,
  onHandleDelete,
  departments,
}) {
  const selectedDepartment = departments.find(
    (department) => department.name === departmentName
  );
  const classes = useStyles();
  const departmentId = selectedDepartment.id;
  const { data } = useQuery(keys.getdocuments(departmentId), () =>
    getDocuments(departmentId)
  );
  const documentData = data?.data?.data.rows;
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
          {documentData?.map((department) =>
            department?.documents.map((document) => (
              <Document document={document} onHandleDelete={onHandleDelete} />
            ))
          )}
        </Box>
      </Box>
    </Paper>
  );
}
