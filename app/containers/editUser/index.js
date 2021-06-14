/**
 *
 * EditUser
 *
 */

import { WrapInCard } from 'components';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import {
  getUserById,
  updateUser,
  getLocations,
  getDepartments,
} from 'state/queryFunctions';
import { keys } from 'state/queryKeys';
import Loading from '../../components/layout/loading';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import EditUserInfo from '../../components/pages/createUser';
import { parseDate } from '../../utils/functions';
import { Toast } from '../../utils/helper';
import { ROLES } from '../../utils/constants';
import { useCreateDepartment } from '../../hooks/departmentMutation';
import { useCreateLocation } from '../../hooks/locationMutation';
import { useAuthContext } from '../../context/authContext';

function EditUser() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const history = useHistory();
  const locationMutation = useCreateLocation();
  const departmentMutation = useCreateDepartment();
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();
  const { data: locations, isLocationLoading } = useQuery(
    keys.location,
    getLocations
  );
  const { data: deparments, isDepartmentLoading } = useQuery(
    keys.department,
    getDepartments
  );
  const { data, isLoading } = useQuery(keys.getUser(id), () => getUserById(id));

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
    },
    onError: ({
      response: {
        data: { message },
      },
    }) => {
      Toast({
        icon: 'error',
        title: message || 'Error while Updating',
      });
    },
  });
  const locationOptions = locations?.data.data.rows.map((val) => ({
    value: val.id,
    label: val.name,
  }));
  const departmentOptions = deparments?.data.data.rows.map((val) => ({
    value: val.id,
    label: val.name,
  }));
  const initialData = data?.data?.data || null;
  const handleSubmit = (updatedData) => {
    const payload = { id, updatedData };
    mutation.mutate(payload);
  };
  const handleCreateLocation = (payload) => {
    locationMutation.mutate(payload);
  };
  const handleCreateDepartment = (payload) => {
    departmentMutation.mutate(payload);
  };
  const defaultDialogData = {
    location: '',
    department: '',
  };

  const defaultData = {
    firstName: '',
    lastName: '',
    password: '',
    contactNo: '',
    locationId: '',
    departmentId: '',
    title: '',
    email: '',
    extension: '',
    status: '',
    joiningDate: null,
    dob: null,
    avatar: '',
    role: ROLES.USER,
  };

  defaultData.isProfilePicAttached = false;
  if (initialData) {
    initialData.password = '';
    initialData.confirmPassword = '';

    if (initialData.avatar)
      initialData.avatar = process.env.API_ASSETS_URL + initialData.avatar;

    if (initialData.joiningDate) {
      initialData.joiningDate = parseDate(initialData.joiningDate);
    }
    if (initialData.dob) {
      initialData.dob = parseDate(initialData.dob);
    }

    if (!initialData.role) {
      initialData.role = ROLES.USER;
    }
  }
  const onLoading = () => {
    if (isLoading || isLocationLoading || isDepartmentLoading) {
      return true;
    }
    return false;
  };

  return (
    <>
      <Helmet>
        <title>Edit User</title>
        <meta name="updateUser" content="ftrv - update user data" />
      </Helmet>

      <WrapInBreadcrumbs>
        <WrapInCard>
          {onLoading() ? (
            <Loading />
          ) : (
            <EditUserInfo
              mutation={mutation}
              initialData={initialData || defaultData}
              initialDialogData={defaultDialogData}
              onHandleSubmit={handleSubmit}
              formType="edit"
              locationOptions={locationOptions}
              departmentOptions={departmentOptions}
              onCreateLocation={handleCreateLocation}
              onCreateDepartment={handleCreateDepartment}
              editRole={role}
            />
          )}
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}
export default memo(EditUser);
