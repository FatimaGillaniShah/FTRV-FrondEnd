import React, { useState } from 'react';
import { Box, Paper } from '@material-ui/core';
import { useQuery } from 'react-query';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
  const stateDocuments = documentData?.map((dep) => dep.documents);

  const [departmentDocuments, updateDepartmentDocuments] = useState(
    stateDocuments
  );

  // const onDragEnd = (result) => {
  //   if (!result.destination) return;
  //   const documentsOrder = Array.from(departmentDocuments);
  //   const [reorderedItem] = documentsOrder.splice(result.source.index, 1);
  //   documentsOrder.splice(result.destination.index, 0, reorderedItem);

  //   updateDepartmentDocuments(documentsOrder);
  // };
  // const getItemStyle = (isDragging, draggableStyle) => {
  //   const { transform } = draggableStyle;
  //   let activeTransform = {};
  //   if (transform) {
  //     activeTransform = {
  //       transform: `translate(0, ${transform.substring(
  //         transform.indexOf(',') + 1,
  //         transform.indexOf(')')
  //       )})`,
  //     };
  //   }
  //   return {
  //     userSelect: 'none',
  //     padding: '20px',
  //     margin: `0 0 ${6}px 0`,
  //     ...draggableStyle,
  //     ...activeTransform,
  //   };
  // };

  // const getListStyle = () => ({
  //   padding: 6,
  //   width: '100%',
  // });

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
          {/* <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <Box
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {departmentDocuments.map((item, index) => (
                    <Draggable
                      key={item.id.toString()}
                      draggableId={item.id.toString()}
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
                        > */}
          {documentData?.map((department) =>
            department?.documents.map((document) => (
              <Document document={document} onHandleDelete={onHandleDelete} />
            ))
          )}
          {/* </Paper>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext> */}
        </Box>
      </Box>
    </Paper>
  );
}
