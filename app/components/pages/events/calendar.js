import { Box } from '@material-ui/core';
import React, { memo, useState } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import dummyData from './dummyEvents';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CustomToolbar } from './customToolbar';

const DragAndDropCalendar = withDragAndDrop(Calendar);

export function EventCalendar() {
  const [draggedEvent, setDraggedEvent] = useState({});
  const [events, setEvents] = useState();
  // const [displayDragItemInCell, setDisplayDragItemInCell] = useState(true);
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

    // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
  };

  const resizeEvent = ({ event, start, end }) => {
    const nextEvents = events.map((existingEvent) =>
      existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    );

    setEvents(nextEvents);

    // alert(`${event.title} was resized to ${start}-${end}`)
  };

  const newEvent = () => {
    // let idList = this.state.events.map(a => a.id)
    // let newId = Math.max(...idList) + 1
    // let hour = {
    //   id: newId,
    //   title: 'New Event',
    //   allDay: event.slots.length == 1,
    //   start: event.start,
    //   end: event.end,
    // }
    // this.setState({
    //   events: this.state.events.concat([hour]),
    // })
  };

  return (
    <Box height="100vh">
      <DragAndDropCalendar
        selectable
        localizer={localizer}
        events={dummyData}
        onEventDrop={moveEvent}
        resizable
        onEventResize={resizeEvent}
        onSelectSlot={newEvent}
        views={{ month: true }}
        // onDragStart={console.log}
        defaultView={Views.MONTH}
        defaultDate={new Date()}
        popup
        dragFromOutsideItem={displayDragItemInCell ? dragFromOutsideItem : null}
        onDropFromOutside={onDropFromOutside}
        handleDragStart={handleDragStart}
        components={{
          toolbar: CustomToolbar,
        }}
      />
    </Box>
  );
}

export default memo(EventCalendar);
