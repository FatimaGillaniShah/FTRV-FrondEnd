/**
 *
 * EditUser
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation } from 'react-query';
import { useParams } from 'react-router';
import { updateUser } from 'state/queryFunctions';
import EditUserInfo from '../../components/pages/createUser';

function EditUser() {
  const mutation = useMutation((payload) => {
    updateUser(payload);
  });
  const { id } = useParams();
  const handleSubmit = (data) => {
    const userData = data;
    if (userData.createdAt) delete userData.createdAt;
    if (userData.updatedAt) delete userData.updatedAt;
    const payload = { id, userData };
    mutation.mutate(payload);
  };

  const initialFiles = {
    firstName: 'test',
    lastName: 'user',
    contactNo: '1231231222',
    department: 'Sales',
    location: 'Washington District of Colombia',
    role: 'user',
    title: 'AVP',
    email: 'test@ftrv.com',
    extension: '123',
    status: 'active',
    joiningDate: '2021-03-02',
    avatar: '1614680613840-employee-Maserati_logotype_logo_on_the_car.jpg',
    deletedAt: null,
  };

  initialFiles.isProfilePicAttached = false;
  initialFiles.avatar = process.env.API_ASSETS_URL + initialFiles.avatar;

  return (
    <>
      <Helmet>
        <title>Edit User</title>
        <meta name="updateUser" content="ftrv - update user data" />
      </Helmet>

      <EditUserInfo
        mutation={mutation}
        initialFiles={initialFiles}
        onUpdateUser={handleSubmit}
        formType="edit"
      />
    </>
  );
}
export default memo(EditUser);
