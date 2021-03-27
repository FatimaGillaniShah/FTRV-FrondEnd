import { Box } from '@material-ui/core';
import React, { memo, useState } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { CustomToolbar } from './customToolbar';

const DragAndDropCalendar = withDragAndDrop(Calendar);

export function EventCalendar({ eventList }) {
  const [draggedEvent, setDraggedEvent] = useState({});
  const [events, setEvents] = useState();
  const history = useHistory();
  const localizer = momentLocalizer(moment); // or globalizeLocalizer

  const displayDragItemInCell = true;

  const handleDragStart = (event) => {
    setDraggedEvent(event);
  };

  const dragFromOutsideItem = () => draggedEvent;

  const onDropFromOutside = ({ start, end, allDay }) => {
    const event = {
      id: draggedEvent.id,
      title: draggedEvent.title,
      start,
      end,
      allDay,
    };

    draggedEvent(null);
    moveEvent({ event, start, end });
  };

  const moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    let { allDay } = event;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }

    const nextEvents = events.map((existingEvent) =>
      existingEvent.id === event.id
        ? { ...existingEvent, start, end, allDay }
        : existingEvent
    );

    setEvents(nextEvents);
  };

  const resizeEvent = ({ event, start, end }) => {
    const nextEvents = events.map((existingEvent) =>
      existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    );

    setEvents(nextEvents);
  };
  const handleSelectEvent = (event) => {
    history.push(`/events/edit/${event.id}`);
  };

  return (
    <Box height="100vh">
      <DragAndDropCalendar
        selectable
        localizer={localizer}
        events={eventList}
        onEventDrop={moveEvent}
        resizable
        onEventResize={resizeEvent}
        views={{ month: true }}
        defaultView={Views.MONTH}
        defaultDate={new Date()}
        popup
        dragFromOutsideItem={displayDragItemInCell ? dragFromOutsideItem : null}
        onDropFromOutside={onDropFromOutside}
        handleDragStart={handleDragStart}
        components={{
          toolbar: CustomToolbar,
        }}
        onSelectEvent={handleSelectEvent}
      />
    </Box>
  );
}

export default memo(EventCalendar);
