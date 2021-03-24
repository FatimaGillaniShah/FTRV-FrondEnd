import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { CreateEventPage } from '../../components/pages/createEvent';

function CreateEvent() {
  const handleSubmit = (values) => {
    console.log('values', values);
  };
  return (
    <>
      <Helmet>
        <title>Create Event</title>
      </Helmet>
      <CreateEventPage onHandleSubmit={handleSubmit} />
    </>
  );
}

export default memo(CreateEvent);
