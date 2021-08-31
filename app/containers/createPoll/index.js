/**
 *
 * CreatePoll
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import _ from 'lodash';
import { Loading } from '../../components/loading';
import CreatePollPage from '../../components/pages/createPoll';
import { navigateTo, Toast } from '../../utils/helper';
import { parseDate } from '../../utils/functions';
import { keys } from '../../state/queryKeys';
import {
  createPolls,
  getPollById,
  updatePoll,
} from '../../state/queryFunctions';

function CreatePoll() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const history = useHistory();
  const { data, isLoading: isPollLoading } = useQuery(
    keys.getPoll(id),
    getPollById,
    {
      enabled: !!id,
    }
  );
  const poll = data?.data?.data[0];
  poll?.options.map((option, index) => {
    const pollOption = {
      [`options-${index + 1}`]: option.name,
    };
    return _.assign(poll, pollOption);
  });

  const onPollsSuccess = () => {
    queryClient.invalidateQueries(keys.polls({}));
    Toast({
      icon: 'success',
      title: `Poll  ${id ? 'Updated' : 'Created'}  successfully`,
    });
    if (id) queryClient.invalidateQueries(keys.getPoll(id));
    navigateTo(history, '/polls');
  };

  const onPollsError = ({
    response: {
      data: { message },
    },
  }) => {
    Toast({
      icon: 'error',
      title: `Option ${message}` || 'Some error occurred',
    });
  };
  const { mutate, isLoading } = useMutation(id ? updatePoll : createPolls, {
    onSuccess: onPollsSuccess,
    onError: onPollsError,
  });
  const handleSubmit = (values) => {
    const pollsData = { ...values };
    const { name, question, startDate, endDate, status, options } = pollsData;
    const updatedPollDataValues = {
      id,
      date: parseDate(new Date()),
      name,
      question,
      status,
      startDate: parseDate(startDate),
      endDate: parseDate(endDate),
      options: options.map((option, index) =>
        option.id
          ? { id: option.id, name: pollsData[`options-${index + 1}`] }
          : pollsData[`options-${index + 1}`]
      ),
    };
    mutate(updatedPollDataValues);
  };
  const initialValues = {
    options: ['', ''],
    name: '',
    question: '',
    'options-1': '',
    'options-2': '',
    startDate: new Date(),
    endDate: new Date(),
    status: 'active',
  };

  return (
    <>
      <Helmet>
        <title>{id ? 'Edit' : 'Create'} Poll</title>
      </Helmet>
      {isPollLoading ? (
        <Loading />
      ) : (
        <CreatePollPage
          onHandleSubmit={handleSubmit}
          id={id}
          initialValues={id ? poll : initialValues}
          loading={isLoading}
        />
      )}
    </>
  );
}

export default memo(CreatePoll);
