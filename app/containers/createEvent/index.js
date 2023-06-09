import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import { Loading } from '../../components/loading';
import { CreateEventPage } from '../../components/pages/createEvent';
import { useDeleteEvent } from '../../hooks/event';
import {
  createEvent,
  getEventById,
  updateEvent,
  getLocations,
} from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { usePermission } from '../../hooks/permission';
import { features, PERMISSIONS } from '../../utils/constants';
import { Modal, navigateTo, Toast, addHourToDate } from '../../utils/helper';

function CreateEvent() {
  const isWriteAllowed = usePermission(
    `${features.EVENTS}-${PERMISSIONS.WRITE}`
  );
  const { data: locationData, isLoading: isLocationLoading } = useQuery(
    keys.locations,
    getLocations
  );
  const history = useHistory();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const today = new Date();
  const { data, isLoading: isEventLoading } = useQuery(
    keys.getEvent(id),
    getEventById,
    {
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
    }
  );
  const { mutate, isLoading } = useMutation(id ? updateEvent : createEvent, {
    onSuccess: () => {
      Toast({
        icon: 'success',
        title: `Event ${id ? 'Updated' : 'Created'}  Successfully`,
      });
      queryClient.invalidateQueries(keys.getEvent(id));
      navigateTo(history, '/events');
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

  const mutation = useDeleteEvent();
  const handleSubmit = (values) => {
    const dataValues = { ...values };
    const locationIds = dataValues.locationIds.map((location) => location.id);
    dataValues.locationIds = locationIds;
    mutate(dataValues);
  };
  const handleDeleteEvent = () => {
    Modal.fire().then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutation.mutate([id]);
      }
    });
  };
  const endDate = addHourToDate(new Date(), 1);

  const initialValues = {
    title: '',
    startDate: today,
    endDate,
    description: '',
    locationIds: [],
  };
  const onLoading = () => {
    if (isEventLoading || isLocationLoading) {
      return true;
    }
    return false;
  };
  return (
    <>
      <Helmet>
        <title>{id ? 'Edit' : 'Create'} Event</title>
      </Helmet>
      {onLoading() ? (
        <Loading />
      ) : (
        <CreateEventPage
          onHandleSubmit={handleSubmit}
          id={id}
          initialValues={id ? data?.data?.data : initialValues}
          pageTitle={id ? 'Update' : 'Create New'}
          onHandleDeleteEvent={handleDeleteEvent}
          locationData={locationData?.data?.data?.rows}
          loading={isLoading}
          isWriteAllowed={isWriteAllowed}
        />
      )}
    </>
  );
}

export default memo(CreateEvent);
