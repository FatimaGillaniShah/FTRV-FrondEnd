import React, { useState, useEffect } from 'react';
import { Box, Paper } from '@material-ui/core';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Document } from './document';
import { H5 } from '../../typography';
import { useStyles } from './style';

export default function DocumentList({
  departmentName,
  onHandleDelete,
  departments,
  onHandleSortOrder,
  isWriteAllowed,
}) {
  const [departmentDocuments, updateDepartmentDocuments] = useState();
  const classes = useStyles();
  useEffect(() => {
    const selectedDepartment = departments.find(
      (department) => department.name === departmentName
    );
    const departmentId = selectedDepartment.id;
    const department = departments.find(
      (document) => document.id === departmentId
    );
    const documentList = department.documents;
    updateDepartmentDocuments(documentList);
  }, [departments]);
  const DocumentListWithoutDraggable = () => (
    <>
      {departmentDocuments?.map((document) => (
        <Box p={4}>
          <Paper className={classes.documentPaper}>
            <Document document={document} onHandleDelete={onHandleDelete} />
          </Paper>
        </Box>
      ))}
    </>
  );
  const DocumentListWithDraggable = () => (
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
                      isWriteAllowed={isWriteAllowed}
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
  );
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const documentsOrder = Array.from(departmentDocuments);
    const [reorderedItem] = documentsOrder.splice(result.source.index, 1);
    documentsOrder.splice(result.destination.index, 0, reorderedItem);
    updateDepartmentDocuments(documentsOrder);
    const documentIds = documentsOrder.map((document) => document.id);
    let sortOrder = 1;
    const sortOrderWithIds = documentIds.map((id) => {
      const sortOrderObj = {
        id,
        sortOrder,
      };
      sortOrder += 1;
      return sortOrderObj;
    });
    const sortOrderData = {
      documents: sortOrderWithIds,
    };
    onHandleSortOrder(sortOrderData);
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
      cursor: 'pointer',
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
          {isWriteAllowed ? (
            <DocumentListWithDraggable />
          ) : (
            <DocumentListWithoutDraggable />
          )}
        </Box>
      </Box>
    </Paper>
  );
}
