/**
 *
 * CreateUser
 *
 */

import { Toast } from 'components';
import CreateNewUser from 'components/pages/createUser';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { createUser } from 'state/queryFunctions';

function CreateUser() {
  const history = useHistory();
  const mutation = useMutation(
    (payload) => createUser(payload),

    {
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
      onError: () => {},
    }
  );
  const handleSubmit = (payload) => {
    mutation.mutate(payload);
  };
  // const initialFiles = {
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   password: '',
  //   contactNo: '',
  //   extension: '',
  //   title: '',
  //   location: '',
  //   department: '',
  //   joiningDate: '',
  //   file: undefined,
  // };
  const initialFiles = {
    firstName: 'temp',
    lastName: 'asdfa',
    email: 'abc@gmail.com',
    password: '123123',
    contactNo: '1231231234',
    extension: '111',
    title: 'sd',
    location: 'sd',
    department: 'sd',
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

      <CreateNewUser
        initialFiles={initialFiles}
        mutation={mutation}
        onUpdateUser={handleSubmit}
        formType="add"
      />
    </>
  );
}

export default memo(CreateUser);
