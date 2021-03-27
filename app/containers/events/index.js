import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { EventsPage } from '../../components/pages/events';

function Events() {
  return (
    <>
      <Helmet>
        <title>Company Events</title>
      </Helmet>
      <EventsPage />
    </>
  );
}

export default memo(Events);
