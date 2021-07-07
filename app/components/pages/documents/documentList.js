import React from 'react';
import { Box, Paper } from '@material-ui/core';
import { useQuery } from 'react-query';
import { Document } from './document';
import { H5 } from '../../typography';
import { getDocuments } from '../../../state/queryFunctions';
import { keys } from '../../../state/queryKeys';
import { useStyles } from './style';

export default function DocumentList({
  documents,
  departmentName,
  onHandleDelete,
  departments,
}) {
  const selectedDepartment = departments.find(
    (department) => department.name === departmentName
  );
  const documentId = selectedDepartment.id;
  // const { data, isLoading } = useQuery(
  //   keys.documents,
  //   getDocuments(documentId)
  // );

  const data = {
    documents: [
      {
        id: 5,
        name: 'test1534543',
        description: 'description',
        url: 'hamza-document-file/1-1625478146996-bc180408870.docx',
        departmentId: 1,
        sortOrder: 1,
      },
      {
        id: 4,
        name: 'test1534543',
        description: 'description',
        url: 'hamza-document-file/1-1625487981150-cost of packages.PNG',
        departmentId: 1,
        sortOrder: 1,
      },
    ],
  };

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
          {data?.documents?.map((document) => (
            <Document document={document} onHandleDelete={onHandleDelete} />
          ))}
        </Box>
      </Box>
    </Paper>
  );
}
