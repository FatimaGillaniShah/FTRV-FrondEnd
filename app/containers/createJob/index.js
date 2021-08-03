import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import { Loading } from '../../components/loading';
import CreateJobPage from '../../components/pages/createJob';
import { createJob, getJobById, updateJob } from '../../state/queryFunctions';
import { navigateTo, Toast, nextWeekDate } from '../../utils/helper';
import { keys } from '../../state/queryKeys';

function AddJob() {
  const { id } = useParams();
  const history = useHistory();
  const queryClient = useQueryClient();
  const { data, isLoading: isJobLoading } = useQuery(
    keys.getJob(id),
    getJobById,
    {
      enabled: !!id,
    }
  );
  let job = data?.data?.data;
  job = {
    ...job,
    departmentId: job?.department?.id,
    locationId: job?.location?.id,
  };
  const onJobSuccess = () => {
    queryClient.invalidateQueries(keys.jobs);
    Toast({
      icon: 'success',
      title: `Job  ${id ? 'Updated' : 'Created'}  successfully`,
    });
    navigateTo(history, '/jobs');
    queryClient.invalidateQueries(keys.jobs);
    if (id) queryClient.invalidateQueries(keys.getJob(id));
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
      expiryDate,
      description,
    };
    mutate(updatedJobDataValues);
  };
  const expiryDate = nextWeekDate();
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
      {isLoading || isJobLoading ? (
        <Loading />
      ) : (
        <CreateJobPage
          id={id}
          initialValues={id ? job : initialValues}
          onHandleSubmit={handleSubmit}
        />
      )}
    </>
  );
}

export default memo(AddJob);
