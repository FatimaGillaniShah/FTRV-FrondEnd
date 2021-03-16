/**
 *
 * CreateUser
 *
 */

import { Toast, WrapInCard } from 'components';
import CreateNewAnnouncement from 'components/pages/createAnnouncement';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { createUser } from 'state/queryFunctions';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';

function CreateAnnouncement() {
  const history = useHistory();
  const mutation = useMutation(createUser, {
    onSuccess: () => {
      history.push({
        pathname: '/directory',
        state: {
          showToast: true,
          toastType: 'success',
          message: `User Created Successfully`,
        },
      });
    },
  });

  const handleSubmit = (payload) => {
    mutation.mutate(payload);
  };
  const defaultData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNo: '',
    extension: '',
    title: '',
    location: '',
    department: '',
    joiningDate: null,
    file: undefined,
  };

  defaultData.isProfilePicAttached = false;
  defaultData.passwordRequired = true;

  const errorMessage = mutation?.error?.response?.data?.message;
  return (
    <>
      <Helmet>
        <title>Create Announcement</title>
        <meta
          name="ftrv create announcement"
          content="ftrv Announcement creation screen"
        />
      </Helmet>

      {mutation.isError && (
        <Toast variant="error">{errorMessage || 'Error while Updating'}</Toast>
      )}

      <WrapInBreadcrumbs>
        <WrapInCard>
          <CreateNewAnnouncement
            initialData={defaultData}
            mutation={mutation}
            onUpdateUser={handleSubmit}
            formType="add"
          />
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(CreateAnnouncement);
