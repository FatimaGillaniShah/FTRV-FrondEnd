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
import { localStorageEntries, ROLES } from '../../utils/constants';

function EditUser() {
  // const { id } = useParams();
  const queryClient = useQueryClient();
  const history = useHistory();
  const {
    user: { data: { role, id } = null } = null,
    setUser,
  } = useAuthContext();
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
        const userData = localStorage.getItem(localStorageEntries.user);
        const parsedUserData = JSON.parse(userData);
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
      queryClient.invalidateQueries(keys.getUser(id));
    },
  });

  const errorMessage = mutation?.error?.response?.data?.message;

  const initialData = data?.data?.data || null;
  const handleSubmit = (updatedData) => {
    const payload = { id, updatedData };
    mutation.mutate(payload);
  };

  const initialFiles = {
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

  initialFiles.isProfilePicAttached = false;
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
        {/* <Box display="flex" flexDirection="column"> */}
        {/* <Breadcrumbs /> */}
        <WrapInCard>
          {isLoading ? (
            <Loading />
          ) : (
            <EditUserInfo
              mutation={mutation}
              initialFiles={
                initialData ||
                (role === ROLES.ADMIN ? initialFiles : { password: '' })
              }
              onUpdateUser={handleSubmit}
              formType="edit"
              editRole={role}
              isThisMyProfile
            />
          )}
        </WrapInCard>
        {/* </Box> */}
      </WrapInBreadcrumbs>
    </>
  );
}
export default memo(EditUser);
