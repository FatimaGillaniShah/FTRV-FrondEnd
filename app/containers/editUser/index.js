/**
 *
 * EditUser
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { getUserById, updateUser } from 'state/queryFunctions';
import { keys } from 'state/queryKeys';
import Loading from '../../components/layout/loading';
import EditUserInfo from '../../components/pages/createUser';

function EditUser() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    keys.getUser(id),
    () => getUserById(id),
    {
      staleTime: 5000,
    }
  );

  const mutation = useMutation(
    (payload) => {
      updateUser(payload);
    },
    {
      onSuccess: () => {
        queryClient.removeQueries(keys.getUser(id));
      },
    }
  );
  const initialData = data?.data?.data || null;
  const handleSubmit = (updatedData) => {
    const userData = updatedData;
    if (userData.createdAt) delete userData.createdAt;
    if (userData.updatedAt) delete userData.updatedAt;
    const payload = { id, userData };
    mutation.mutate(payload);
  };

  const initialFiles = {
    firstName: '',
    lastName: '',
    contactNo: '',
    department: '',
    location: '',
    role: '',
    title: '',
    email: '',
    extension: '',
    status: '',
    joiningDate: '',
    avatar: '',
  };

  initialFiles.isProfilePicAttached = false;
  initialFiles.avatar = process.env.API_ASSETS_URL + initialFiles.avatar;

  return (
    <>
      <Helmet>
        <title>Edit User</title>
        <meta name="updateUser" content="ftrv - update user data" />
      </Helmet>

      {isLoading ? (
        <Loading />
      ) : (
        <EditUserInfo
          mutation={mutation}
          initialFiles={initialData || initialFiles}
          onUpdateUser={handleSubmit}
          formType="edit"
        />
      )}
    </>
  );
}
export default memo(EditUser);
