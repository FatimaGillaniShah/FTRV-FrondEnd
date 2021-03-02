/**
 *
 * CreateUser
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation } from 'react-query';
import CreateNewUser from 'components/pages/createUser';
import { createUser } from 'state/queryFunctions';

function CreateUser() {
  const mutation = useMutation((payload) => createUser(payload));
  const handleSubmit = (data) => {
    mutation.mutate(data);
  };
  const initialFiles = {
    firstName: '',
    lastName: '',
    email: '',
    contactNo: '',
    extension: '',
    title: '',
    location: '',
    department: '',
    joiningDate: '',
    file: undefined,
  };
  initialFiles.isProfilePicAttached = false;

  return (
    <>
      <Helmet>
        <title>Create User</title>
        <meta name="ftrv create user" content="ftrv user creation screen" />
      </Helmet>

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
