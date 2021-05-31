/**
 *
 * CreateUser
 *
 */

import { WrapInCard } from 'components';
import CreateNewUser from 'components/pages/createUser';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { createUser, getLocations, getDepartments } from 'state/queryFunctions';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import { Toast } from '../../utils/helper';
import { ROLES } from '../../utils/constants';
import { useAuthContext } from '../../context/authContext';
import { keys } from '../../state/queryKeys';
import { Loading } from '../../components/loading';

function CreateUser() {
  const history = useHistory();
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();
  const { data: locations, isLocationLoading } = useQuery(
    keys.getLocation,
    getLocations
  );
  const { data: deparments, isDepartmentLoading } = useQuery(
    keys.getDepartment,
    getDepartments
  );
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
    onError: ({
      response: {
        data: { message },
      },
    }) => {
      Toast({
        icon: 'error',
        title: message,
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
  const handleSubmit = (payload) => {
    mutation.mutate(payload);
  };
  const defaultData = {
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
    dob: null,
    file: undefined,
    role: ROLES.USER,
  };

  defaultData.isProfilePicAttached = false;
  defaultData.passwordRequired = true;

  return (
    <>
      <Helmet>
        <title>Create User</title>
        <meta name="ftrv create user" content="ftrv user creation screen" />
      </Helmet>

      <WrapInBreadcrumbs>
        <WrapInCard>
          {isLocationLoading && isDepartmentLoading && <Loading />}
          <CreateNewUser
            initialData={defaultData}
            mutation={mutation}
            onUpdateUser={handleSubmit}
            formType="add"
            editRole={role}
            locationOptions={locationOptions}
            departmentOptions={departmentOptions}
          />
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(CreateUser);
