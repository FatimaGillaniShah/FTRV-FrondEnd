import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory, useParams } from 'react-router-dom';
import { CreateEventPage } from '../../components/pages/createEvent';
import { Modal, Toast } from '../../utils/helper';

function CreateEvent() {
  const history = useHistory();
  const { id } = useParams();
  const handleSubmit = () => {
    Toast({
      icon: 'success',
      title: `Event ${id ? 'updated' : 'created'}  successfully`,
    });
    history.push('/events');
  };
  const handleDeleteEvent = () => {
    Modal.fire();
  };
  return (
    <>
      <Helmet>
        <title>{id ? 'Edit' : 'Create'} Event</title>
      </Helmet>
      <CreateEventPage
        onHandleSubmit={handleSubmit}
        id={id}
        initialValues={id ? {} : {}}
        pageTitle={id ? 'Update' : 'Create New'}
        onHandleDeleteEvent={handleDeleteEvent}
      />
    </>
  );
}

export default memo(CreateEvent);
