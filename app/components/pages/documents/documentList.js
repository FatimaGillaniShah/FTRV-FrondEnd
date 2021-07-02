import React, { useState } from 'react';
import { Box, Paper } from '@material-ui/core';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Document } from './document';
import { H5 } from '../../typography';
import { useStyles } from './style';

export default function DocumentList({
  documents,
  departmentName,
  onHandleDelete,
}) {
  const classes = useStyles();
  const [departmentDocuments, updateDepartmentDocuments] = useState(documents);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const documentsOrder = Array.from(departmentDocuments);
    const [reorderedItem] = documentsOrder.splice(result.source.index, 1);
    documentsOrder.splice(result.destination.index, 0, reorderedItem);

    updateDepartmentDocuments(documentsOrder);
  };
  const getStyle = (isDragging, draggableStyle) => {
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
      ...draggableStyle,
      ...activeTransform,
    };
  };
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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="document">
            {(provided) => (
              <Box
                className="document"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {departmentDocuments.map(({ id, name, description }, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(providedDraggable, snapshot) => (
                      <Box
                        className={classes.documentList}
                        ref={providedDraggable.innerRef}
                        {...providedDraggable.draggableProps}
                        {...providedDraggable.dragHandleProps}
                        style={getStyle(
                          snapshot.isDragging,
                          providedDraggable.draggableProps.style
                        )}
                      >
                        <Document
                          document={document}
                          onHandleDelete={onHandleDelete}
                          name={name}
                          description={description}
                        />
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </Paper>
  );
}
