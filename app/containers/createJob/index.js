import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import { Loading } from '../../components/loading';
import CreateJobPage from '../../components/pages/createJob';
import { createJob, getJobById, updateJob } from '../../state/queryFunctions';
import { navigateTo, Toast, nextWeekDate } from '../../utils/helper';
import { keys } from '../../state/queryKeys';
import { parseDate } from '../../utils/functions';

function AddJob() {
  const { id } = useParams();
  const history = useHistory();
  const queryClient = useQueryClient();
  const { data, isLoading: isJobLoading } = useQuery(
    keys.getJob(id),
    getJobById,
    {
      enabled: !!id,
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
  let job = data?.data?.data[0];
  job = {
    ...job,
    departmentId: job?.department?.id,
    locationId: job?.location?.id,
  };
  const onJobSuccess = () => {
    Toast({
      icon: 'success',
      title: `Job  ${id ? 'Updated' : 'Created'}  successfully`,
    });
    queryClient.removeQueries(keys.getJobs({}));
    if (id) queryClient.invalidateQueries(keys.getJob(id));
    navigateTo(history, '/jobs');
  };

  const onJobError = ({
    response: {
      data: { message },
    },
  }) => {
    Toast({
      icon: 'error',
      title: message || 'Some error occurred',
    });
  };
  const { mutate, isLoading } = useMutation(id ? updateJob : createJob, {
    onSuccess: onJobSuccess,
    onError: onJobError,
  });

  const handleSubmit = (values) => {
    const jobData = { ...values };
    const {
      title,
      departmentId,
      locationId,
      expiryDate,
      description,
    } = jobData;
    const updatedJobDataValues = {
      id,
      title,
      departmentId,
      locationId,
      expiryDate: parseDate(expiryDate),
      description,
    };
    mutate(updatedJobDataValues);
  };
  const expiryDate = nextWeekDate(7);
  const initialValues = {
    title: '',
    departmentId: '',
    locationId: '',
    expiryDate,
    description: '',
  };
  return (
    <>
      <Helmet>
        <title>{id ? 'Edit' : 'Create'} Job</title>
      </Helmet>
      {isJobLoading ? (
        <Loading />
      ) : (
        <CreateJobPage
          id={id}
          initialValues={id ? job : initialValues}
          onHandleSubmit={handleSubmit}
          loading={isLoading}
        />
      )}
    </>
  );
}

export default memo(AddJob);
