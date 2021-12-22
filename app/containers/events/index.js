import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Loading } from '../../components/loading';
import { EventsPage } from '../../components/pages/events';
import Show from '../../components/show';
import { fetchEvents } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { usePermission } from '../../hooks/permission';
import { features, PERMISSIONS } from '../../utils/constants';
import { parseDate } from '../../utils/functions';

function Events() {
  const isWriteAllowed = usePermission(
    `${features.EVENTS}-${PERMISSIONS.WRITE}`
  );
  const today = parseDate(new Date());
  const [eventWindowDate, setEventWindowDate] = useState(today);
  const [pagination, setPagination] = useState(false);

  const { data, isLoading } = useQuery(
    keys.events({ eventWindowDate }),
    fetchEvents
  );
  return (
    <>
      <Helmet>
        <title>Company Events</title>
      </Helmet>
      <Show IF={isLoading && !pagination}>
        <Loading />
      </Show>
      <Show IF={!isLoading || pagination}>
        <EventsPage
          isLoading={isLoading}
          eventList={data?.data?.data?.rows}
          setEventWindowDate={setEventWindowDate}
          eventWindowDate={eventWindowDate}
          setPagination={setPagination}
          pagination={pagination}
          isWriteAllowed={isWriteAllowed}
        />
      </Show>
    </>
  );
}

export default memo(Events);
