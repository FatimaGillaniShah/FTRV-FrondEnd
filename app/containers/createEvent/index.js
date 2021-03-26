import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { CreateEventPage } from '../../components/pages/createEvent';

function CreateEvent() {
  const history = useHistory();
  const handleSubmit = () => {
    history.push('/events');
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
