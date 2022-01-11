import { Box } from '@material-ui/core';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchEvents } from '../../../state/queryFunctions';
import { keys } from '../../../state/queryKeys';
import { parseDate } from '../../../utils/functions';
import Show from '../../show';
import { EventCalendar } from '../events/calendar';

function EventCalendarHome() {
  const [pagination, setPagination] = useState(false);
  const date = parseDate(new Date());
  const [eventWindowDate, setEventWindowDate] = useState(date);

  const { data: eventResponse, isLoading: isEventsLoading } = useQuery(
    keys.events({ eventWindowDate }),
    fetchEvents,
    {
      keepPreviousData: true,
    }
  );
  const eventList = eventResponse?.data?.data?.rows;
  return (
    <Show IF={!isEventsLoading}>
      <Box
        height={['55vh', '60vh', '60vh', '60vh']}
        p={2}
        mr={[0, 0, 0, 8]}
        ml={[0, 0, 0, 8]}
      >
        <EventCalendar
          home
          eventList={eventList}
          eventWindowDate={eventWindowDate}
          setEventWindowDate={setEventWindowDate}
          setPagination={setPagination}
          pagination={pagination}
        />
      </Box>
    </Show>
  );
}

export default EventCalendarHome;
