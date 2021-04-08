import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Loading } from '../../components/loading';
import { CreateEventPage } from '../../components/pages/createEvent';
import {
  createEvent,
  deleteEvents,
  getEventById,
  updateEvent,
} from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { Modal, Toast } from '../../utils/helper';

function CreateEvent() {
  const history = useHistory();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(keys.getEvent(id), getEventById, {
    enabled: !!id,
    refetchOnWindowFocus: false,
    onError: ({
      response: {
        data: { message },
      },
    }) => {
      Toast({
        icon: 'error',
        title: message || 'Some error occurred',
      });
    },
  });
  const { mutate } = useMutation(id ? updateEvent : createEvent, {
    onSuccess: () => {
      Toast({
        icon: 'success',
        title: `Event ${id ? 'Updated' : 'Created'}  Successfully`,
      });
      queryClient.invalidateQueries(keys.getEvent(id));
      history.push('/events');
    },
    onError: ({
      response: {
        data: { message },
      },
    }) =>
      Toast({
        icon: 'error',
        title: message || 'Some error occurred',
      }),
  });
  const mutation = useMutation(deleteEvents, {
    onSuccess: ({
      data: {
        data: { count },
      },
    }) => {
      Swal.fire('Deleted!', `${count} event deleted.`, 'success');
      queryClient.invalidateQueries(keys.events);
      history.push('/events');
    },
    onError: ({
      response: {
        data: { message },
      },
    }) =>
      Toast({
        icon: 'error',
        title: message || 'Some error occurred',
      }),
  });
  const handleSubmit = (values) => {
    mutate(values);
  };
  const handleDeleteEvent = () => {
    Modal.fire().then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutation.mutate([id]);
      }
    });
  };
  const initialValues = {
    title: '',
    startDate: new Date(),
    endDate: new Date(),
    description: '',
  };
  return (
    <>
      <Helmet>
        <title>{id ? 'Edit' : 'Create'} Event</title>
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : (
        <CreateEventPage
          onHandleSubmit={handleSubmit}
          id={id}
          initialValues={id ? data?.data?.data : initialValues}
          pageTitle={id ? 'Update' : 'Create New'}
          onHandleDeleteEvent={handleDeleteEvent}
        />
      )}
    </>
  );
}

export default memo(CreateEvent);
