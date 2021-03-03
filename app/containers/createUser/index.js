/**
 *
 * CreateUser
 *
 */

import { Toast, WrapInCard } from 'components';
import CreateNewUser from 'components/pages/createUser';
import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { createUser } from 'state/queryFunctions';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';

function CreateUser() {
  const history = useHistory();
  const mutation = useMutation(createUser);

  useEffect(() => {
    if (mutation.isSuccess) {
      history.push({
        pathname: '/directory',
        state: {
          showToast: true,
          toastType: 'success',
          message: `User Created Successfully`,
        },
      });
    }
  }, [mutation.isSuccess]);
  const handleSubmit = (payload) => {
    mutation.mutate(payload);
  };
  const initialFiles = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contactNo: '',
    extension: '',
    title: '',
    location: '',
    department: '',
    joiningDate: '',
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
