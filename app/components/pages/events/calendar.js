import React, { memo, useState } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useHistory } from 'react-router-dom';
import { Box, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { CustomToolbar } from './customToolbar';
import { useAuthContext } from '../../../context/authContext';

const DragAndDropCalendar = withDragAndDrop(Calendar);

export function EventCalendar({ eventList, home }) {
  const [draggedEvent, setDraggedEvent] = useState({});
  const [events, setEvents] = useState();
  const history = useHistory();
  const localizer = momentLocalizer(moment); // or globalizeLocalizer
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    user: { data },
  } = useAuthContext();

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
  const dayFormat = () => {
    if (home || matches) {
      return 'dd';
    }

    return 'dddd';
  };
  const formats = {
    weekdayFormat: (date, culture, weekLocalizer) =>
      weekLocalizer.format(date, `${dayFormat()}`, culture),
  };
  const handleEventPropGetter = () => {
    const eventStyle = {
      backgroundColor: theme.palette.secondary.main,
    };
    return { style: eventStyle };
  };
  const handleOnMouseOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <DragAndDropCalendar
      formats={formats}
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
      onSelectEvent={handleSelectEvent}
      tooltipAccessor={(event) =>
        `${event.start.toLocaleTimeString([], { timeStyle: 'short' })} - ${
          event.title
        } - ${event.end.toLocaleTimeString([], { timeStyle: 'short' })}`
      }
      components={{
        toolbar: CustomToolbar({ home, data }),
      }}
      eventPropGetter={handleEventPropGetter}
      messages={{
        showMore: (total) => (
          <Box onMouseOver={handleOnMouseOver} color="text.secondary">
            {`+${total} more`}
          </Box>
        ),
      }}
    />
  );
}

EventCalendar.propTypes = {
  eventList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      allDay: PropTypes.bool,
      start: PropTypes.instanceOf(Date).isRequired,
      end: PropTypes.instanceOf(Date).isRequired,
    })
  ),
};
EventCalendar.defaultProps = {
  eventList: [],
};

export default memo(EventCalendar);
