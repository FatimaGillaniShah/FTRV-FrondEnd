/**
 *
 * EditUser
 *
 */

import { Toast, WrapInCard } from 'components';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import { getUserById, updateUser } from 'state/queryFunctions';
import { keys } from 'state/queryKeys';
import Loading from '../../components/layout/loading';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import EditUserInfo from '../../components/pages/createUser';
import { useAuthContext } from '../../context/authContext';
import { ROLES } from '../../utils/constants';

function EditUser() {
  const queryClient = useQueryClient();
  const history = useHistory();
  const { user, setUser } = useAuthContext();
  const id = user && user.data && user.data.id;
  const role = user && user.data && user.data.role;
  const { data, isLoading } = useQuery(
    keys.getUser(id),
    () => getUserById(id),
    { refetchOnWindowFocus: false }
  );
  const mutation = useMutation(updateUser, {
    onSuccess: ({
      data: {
        data: { avatar },
      },
    }) => {
      if (avatar) {
        const parsedUserData = { ...user };
        if (parsedUserData.data) {
          parsedUserData.data.avatar = avatar;
          setUser(parsedUserData);
        }
      }

      history.push({
        pathname: '/directory',
        state: {
          showToast: true,
          toastType: 'success',
          message: `User Updated Successfully`,
        },
      });

      queryClient.removeQueries(keys.getUser(id));
    },
  });

  const errorMessage = mutation?.error?.response?.data?.message;

  const initialData = data?.data?.data || null;
  const handleSubmit = (updatedData) => {
    const payload = { id, updatedData };
    mutation.mutate(payload);
  };
  let formDefaultData = {};

  if (initialData) {
    initialData.password = '';
    initialData.confirmPassword = '';
    if (initialData.avatar && !initialData.avatar.includes('http'))
      initialData.avatar = process.env.API_ASSETS_URL + initialData.avatar;

    if (initialData.joiningDate) {
      const parsedDate = new Date(initialData.joiningDate);

      let parseMonth = parsedDate.getMonth();
      parseMonth += 1;
      if (parseMonth < 10) {
        parseMonth = `0${parseMonth}`;
      }
      initialData.joiningDate = `${parsedDate.getDate()}-${parseMonth}-${parsedDate.getFullYear()}`;
    }
  } else if (role === ROLES.USER) {
    formDefaultData = { password: '' }; // User can only edit his password and avatar in profile
  } else if (role === ROLES.ADMIN) {
    formDefaultData = {
      firstName: '',
      lastName: '',
      password: '',
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

    formDefaultData.isProfilePicAttached = false;
  }
  return (
    <>
      <Helmet>
        <title>Edit User</title>
        <meta name="updateUser" content="ftrv - update user data" />
      </Helmet>

      {mutation.isError && (
        <Toast variant="error">{errorMessage || 'Error while Updating'}</Toast>
      )}
      <WrapInBreadcrumbs>
        <WrapInCard>
          {isLoading ? (
            <Loading />
          ) : (
            <EditUserInfo
              mutation={mutation}
              initialData={initialData || formDefaultData}
              onUpdateUser={handleSubmit}
              formType="edit"
              editRole={role}
              isThisMyProfile
            />
          )}
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}
export default memo(EditUser);
