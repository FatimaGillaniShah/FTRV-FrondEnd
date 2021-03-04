/**
 *
 * EditUser
 *
 */

import { Toast, WrapInCard } from 'components';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { getUserById, updateUser } from 'state/queryFunctions';
import { keys } from 'state/queryKeys';
import Loading from '../../components/layout/loading';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import EditUserInfo from '../../components/pages/createUser';

function EditUser() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const history = useHistory();

  const { data, isLoading } = useQuery(
    keys.getUser(id),
    () => getUserById(id),
    { refetchOnWindowFocus: false }
  );

  const mutation = useMutation(updateUser, {
    onSuccess: () => {
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
    if (initialData.avatar)
      initialData.avatar = process.env.API_ASSETS_URL + initialData.avatar;

    if (initialData.joiningDate) {
      const parsedDate = new Date(initialData.joiningDate);

      let parseMonth = parsedDate.getMonth();
      parseMonth += 1;
      if (parseMonth < 10) {
        parseMonth = `0${parseMonth}`;
      }
      initialData.joiningDate = `${parsedDate.getFullYear()}-${parseMonth}-${parsedDate.getDate()}`;
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
              initialFiles={initialData || initialFiles}
              onUpdateUser={handleSubmit}
              formType="edit"
            />
          )}
        </WrapInCard>
        {/* </Box> */}
      </WrapInBreadcrumbs>
    </>
  );
}
export default memo(EditUser);
