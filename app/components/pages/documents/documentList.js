import React, { useState, useEffect } from 'react';
import { Box, Paper } from '@material-ui/core';
import { useQuery } from 'react-query';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Document } from './document';
import { H5 } from '../../typography';
import { getDocuments } from '../../../state/queryFunctions';
import { keys } from '../../../state/queryKeys';
import { useStyles } from './style';
import { ROLES } from '../../../utils/constants';
import { useAuthContext } from '../../../context/authContext';

export default function DocumentList({
  departmentName,
  onHandleDelete,
  departments,
}) {
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();
  const selectedDepartment = departments.find(
    (department) => department.name === departmentName
  );
  const classes = useStyles();
  const departmentId = selectedDepartment.id;
  const { data } = useQuery(keys.getdocuments(departmentId), () =>
    getDocuments(departmentId)
  );
  const documentData = data?.data?.data;
  const documentList = documentData?.rows[0];
  const [departmentDocuments, updateDepartmentDocuments] = useState([]);

  useEffect(() => {
    updateDepartmentDocuments(documentList?.documents);
  }, [documentList]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const documentsOrder = Array.from(departmentDocuments);
    const [reorderedItem] = documentsOrder.splice(result.source.index, 1);
    documentsOrder.splice(result.destination.index, 0, reorderedItem);

    updateDepartmentDocuments(documentsOrder);
  };
  const getItemStyle = (isDragging, draggableStyle) => {
    const { transform } = draggableStyle;
    let activeTransform = {};
    if (transform) {
      activeTransform = {
        transform: `translate(0, ${transform.substring(
          transform.indexOf(',') + 1,
          transform.indexOf(')')
        )})`,
      };
    }
    return {
      userSelect: 'none',
      padding: '20px',
      margin: `0 0 ${6}px 0`,
      ...draggableStyle,
      ...activeTransform,
    };
  };

  const getListStyle = () => ({
    padding: 6,
    width: '100%',
  });

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
          {role === ROLES.ADMIN ? (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <Box
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {departmentDocuments?.map((document, index) => (
                      <Draggable
                        key={document.id.toString()}
                        draggableId={document.id.toString()}
                        index={index}
                      >
                        {(providedDragabble, snapshotDragabble) => (
                          <Paper
                            ref={providedDragabble.innerRef}
                            {...providedDragabble.draggableProps}
                            {...providedDragabble.dragHandleProps}
                            style={getItemStyle(
                              snapshotDragabble.isDragging,
                              providedDragabble.draggableProps.style
                            )}
                          >
                            <Document
                              document={document}
                              onHandleDelete={onHandleDelete}
                            />
                          </Paper>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <>
              {' '}
              {departmentDocuments?.map((document) => (
                <Box p={4}>
                  <Paper className={classes.documentPaper}>
                    <Document
                      document={document}
                      onHandleDelete={onHandleDelete}
                    />
                  </Paper>
                </Box>
              ))}
            </>
          )}
        </Box>
      </Box>
    </Paper>
  );
}
