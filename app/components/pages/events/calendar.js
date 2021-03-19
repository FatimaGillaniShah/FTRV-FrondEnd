import { Box } from '@material-ui/core';
import React, { memo, useEffect, useState } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import dummyData from './dummyEvents';
// import 'react-big-calendar/lib/sass/styles.scss';

const DragAndDropCalendar = withDragAndDrop(Calendar);

export function EventCalendar() {
  const [draggedEvent, setDraggedEvent] = useState({});
  const [events, setEvents] = useState();
  // const [displayDragItemInCell, setDisplayDragItemInCell] = useState(true);
  const localizer = momentLocalizer(moment); // or globalizeLocalizer
  const displayDragItemInCell = true;
  useEffect(() => {
    setEvents(dummyData);
  }, [dummyData]);

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
    <Box h="100%">
      <DragAndDropCalendar
        selectable
        localizer={localizer}
        events={events}
        onEventDrop={moveEvent}
        resizable
        onEventResize={resizeEvent}
        onSelectSlot={newEvent}
        // onDragStart={console.log}
        defaultView={Views.MONTH}
        defaultDate={new Date()}
        popup
        dragFromOutsideItem={displayDragItemInCell ? dragFromOutsideItem : null}
        onDropFromOutside={onDropFromOutside}
        handleDragStart={handleDragStart}
      />
    </Box>
  );
}

export default memo(EventCalendar);

// import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'
