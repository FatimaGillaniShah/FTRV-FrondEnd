import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { Loading } from '../../components/loading';
import CreateRingGroupPage from '../../components/pages/createRingGroup';
import { createRingGroup } from '../../state/queryFunctions';
import { navigateTo, Toast } from '../../utils/helper';

function CreateLinkCategory() {
  const history = useHistory();

  const { mutate, isLoading } = useMutation(createRingGroup, {
    onSuccess: () => {
      Toast({
        icon: 'success',
        title: 'Ring Group Created Successfully',
      });
      navigateTo(history, '/ring-group');
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
  const initialValues = {
    name: '',
    extension: '',
    locationId: '',
    departmentId: '',
  };
  return (
    <>
      <Helmet>
        <title> Create Ring Group</title>
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : (
        <CreateRingGroupPage
          onHandleSubmit={handleSubmit}
          initialValues={initialValues}
        />
      )}
    </>
  );
}

export default memo(CreateLinkCategory);
