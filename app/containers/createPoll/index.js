/**
 *
 * CreatePoll
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { Loading } from '../../components/loading';
import CreatePollPage from '../../components/pages/createPoll';
import { navigateTo, Toast } from '../../utils/helper';
import { parseDate } from '../../utils/functions';
import { keys } from '../../state/queryKeys';
import { createPolls } from '../../state/queryFunctions';

function CreatePoll() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const history = useHistory();
  const onPollsSuccess = () => {
    Toast({
      icon: 'success',
      title: `Poll Created successfully`,
    });
    queryClient.invalidateQueries(keys.polls({}));
    navigateTo(history, '/polls');
  };

  const onPollsError = ({
    response: {
      data: { message },
    },
  }) => {
    Toast({
      icon: 'error',
      title: message || 'Some error occurred',
    });
  };
  const { mutate, isLoading } = useMutation(createPolls, {
    onSuccess: onPollsSuccess,
    onError: onPollsError,
  });
  const handleSubmit = (values) => {
    const pollsData = { ...values };
    const { name, question, startDate, endDate, status, options } = pollsData;
    const updatedPollDataValues = {
      date: parseDate(new Date()),
      name,
      question,
      status,
      startDate: parseDate(startDate),
      endDate: parseDate(endDate),
      options: options.map(
        (option, index) => pollsData[`options-${index + 1}`]
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
      {isLoading ? (
        <Loading />
      ) : (
        <CreatePollPage
          onHandleSubmit={handleSubmit}
          id={id}
          initialValues={id ? initialValues : initialValues}
        />
      )}
    </>
  );
}

export default memo(CreatePoll);
