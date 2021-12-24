/**
 *
 * EditUser
 *
 */

import { WrapInCard } from 'components';
import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import { getUserById, updateUser } from 'state/queryFunctions';
import { keys } from 'state/queryKeys';
import Loading from '../../components/layout/loading';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import EditUserInfo from '../../components/pages/createUser';
import { useAuthContext } from '../../context/authContext';
import { usePermission } from '../../hooks/permission';
import { features, PERMISSIONS } from '../../utils/constants';
import { parseDate } from '../../utils/functions';
import { navigateTo, Toast } from '../../utils/helper';

function EditUser() {
  const queryClient = useQueryClient();
  const history = useHistory();
  const isReadAllowed = usePermission(
    `${features.DIRECTORY}-${PERMISSIONS.READ}`
  );
  const {
    user: {
      data: { id, isAdmin },
    },
    user,
    setUser,
  } = useAuthContext();
  const [feature, setFeature] = useState({
    LOCATION: false,
    DEPARTMENT: false,
    GROUP: false,
  });

  const permit = usePermission;
  Object.keys(feature).map((resource) => {
    const can = permit(`${resource}-${PERMISSIONS.READ}`);
    if (can && !feature[resource]) {
      setFeature((prevState) => ({
        ...prevState,
        [resource]: true,
      }));
    }
    return feature;
  });
  const isWriteAllowed = usePermission(
    `${features.DIRECTORY}-${PERMISSIONS.WRITE}`
  );
  const { data, isLoading } = useQuery(
    keys.getUser(id),
    () => getUserById(id),
    {
      onError: ({
        response: {
          data: { message },
        },
      }) => {
        Toast({
          icon: 'error',
          title: message || 'Some error occurred',
        });
      },
    }
  );
  const mutation = useMutation(updateUser, {
    onSuccess: ({
      data: {
        data: { avatar, firstName, lastName },
      },
    }) => {
      if (avatar || avatar === '') {
        const parsedUserData = { ...user };
        if (parsedUserData.data) {
          parsedUserData.data.avatar = avatar;
          parsedUserData.data.firstname = firstName;
          parsedUserData.data.lastname = lastName;
          parsedUserData.data.name = `${firstName}${' '}${lastName}`;
          setUser(parsedUserData);
        }
      }

      Toast({
        icon: 'success',
        title: `User Updated Successfully`,
      });
      queryClient.invalidateQueries(keys.getUsers({}));
      queryClient.invalidateQueries(keys.getUser(id));
      if (isReadAllowed) {
        navigateTo(history, '/directory');
      } else {
        navigateTo(history, '/home');
      }
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

  const initialData = data?.data?.data || null;
  const handleSubmit = (updatedData) => {
    const payload = { id, updatedData };
    mutation.mutate(payload);
  };
  let formDefaultData = {};

  if (initialData) {
    initialData.password = '';
    initialData.confirmPassword = '';

    if (initialData.joiningDate) {
      initialData.joiningDate = parseDate(initialData.joiningDate);
    }
    if (initialData.dob) {
      initialData.dob = parseDate(initialData.dob);
    }
    initialData.locationId = initialData?.location?.id;
    initialData.departmentId = initialData?.department?.id;
  } else if (!isAdmin || !isWriteAllowed) {
    formDefaultData = { password: '' }; // User can only edit his password and avatar in profile
  } else if (isAdmin || isWriteAllowed) {
    formDefaultData = {
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
    };

    formDefaultData.isProfilePicAttached = false;
  }
  let defaultDepartment = [];
  let defaultLocation = [];

  if (initialData !== null) {
    const { location, department } = initialData;
    defaultDepartment = [{ value: department?.id, label: department?.name }];
    defaultLocation = [{ value: location?.id, label: location?.name }];
  }

  return (
    <>
      <Helmet>
        <title>Edit User</title>
        <meta name="updateUser" content="ftrv - update user data" />
      </Helmet>
      <WrapInBreadcrumbs>
        <WrapInCard>
          {isLoading ? (
            <Loading />
          ) : (
            <EditUserInfo
              mutation={mutation}
              initialData={initialData || formDefaultData}
              onHandleSubmit={handleSubmit}
              formType="edit"
              defaultDepartment={defaultDepartment}
              defaultLocation={defaultLocation}
              feature={feature}
              edit={isAdmin}
              isThisMyProfile
              isReadAllowed={isReadAllowed}
            />
          )}
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}
export default memo(EditUser);
