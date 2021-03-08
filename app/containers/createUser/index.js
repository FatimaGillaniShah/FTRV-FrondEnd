/**
 *
 * CreateUser
 *
 */

import { Toast, WrapInCard } from 'components';
import CreateNewUser from 'components/pages/createUser';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { createUser } from 'state/queryFunctions';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';

function CreateUser() {
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
  const initialFiles = {
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

  initialFiles.isProfilePicAttached = false;
  initialFiles.passwordRequired = true;

  const errorMessage = mutation?.error?.response?.data?.message;
  return (
    <>
      <Helmet>
        <title>Create User</title>
        <meta name="ftrv create user" content="ftrv user creation screen" />
      </Helmet>

      {mutation.isError && (
        <Toast variant="error">{errorMessage || 'Error while Updating'}</Toast>
      )}

      <WrapInBreadcrumbs>
        <WrapInCard>
          <CreateNewUser
            initialFiles={initialFiles}
            mutation={mutation}
            onUpdateUser={handleSubmit}
            formType="add"
          />
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(CreateUser);
