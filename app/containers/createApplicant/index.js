import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router';
import CreateApplicantPage from '../../components/pages/createApplicant';
import { createApplicant } from '../../state/queryFunctions';
import { navigateTo, Toast } from '../../utils/helper';
import { keys } from '../../state/queryKeys';
import { createFormData } from '../../utils/functions';

function CreateApplicant() {
  const { id } = useParams();
  const history = useHistory();
  const queryClient = useQueryClient();
  const onApplicantSuccess = () => {
    Toast({
      icon: 'success',
      title: 'Applied Successfully ',
    });
    queryClient.invalidateQueries(keys.applicant);
    navigateTo(history, '/jobs');
  };

  const onApplicantError = ({
    response: {
      data: { message },
    },
  }) => {
    Toast({
      icon: 'error',
      title: message || 'Some error occurred',
    });
  };
  const { mutate, isLoading } = useMutation(createApplicant, {
    onSuccess: onApplicantSuccess,
    onError: onApplicantError,
  });

  const handleSubmit = (values) => {
    let applicantDataValues = { ...values };
    applicantDataValues = {
      ...applicantDataValues,
      jobId: id,
    };
    const formData = createFormData(applicantDataValues);
    mutate(formData);
  };
  const initialValues = {
    file: '',
    note: '',
  };
  return (
    <>
      <Helmet>
        <title>Create Applicant</title>
      </Helmet>
      <CreateApplicantPage
        onHandleSubmit={handleSubmit}
        initialValues={initialValues}
        loading={isLoading}
      />
    </>
  );
}

export default memo(CreateApplicant);
