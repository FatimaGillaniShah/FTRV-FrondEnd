/**
 *
 * EditUser
 *
 */

import { WrapInCard } from 'components';
import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { getUserById, updateUser } from 'state/queryFunctions';
import { keys } from 'state/queryKeys';
import Loading from '../../components/layout/loading';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import EditUserInfo from '../../components/pages/createUser';
import { parseDate } from '../../utils/functions';
import { features, PERMISSIONS } from '../../utils/constants';
import { navigateTo, Toast } from '../../utils/helper';
import { useAuthContext } from '../../context/authContext';
import { usePermission } from '../../hooks/permission';

function EditUser() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const history = useHistory();
  const isReadAllowed = usePermission(
    `${features.DIRECTORY}-${PERMISSIONS.READ}`
  );
  const {
    user: {
      data: { isAdmin },
    },
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
    onSuccess: () => {
      Toast({
        icon: 'success',
        title: `User Updated Successfully`,
      });
      queryClient.invalidateQueries(keys.getUser(id));
      queryClient.invalidateQueries(keys.getUsers({}));
      navigateTo(history, '/directory');
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
  };

  defaultData.isProfilePicAttached = false;
  if (initialData) {
    initialData.password = '';
    initialData.confirmPassword = '';

    initialData.locationId = initialData?.location?.id;
    initialData.departmentId = initialData?.department?.id;

    if (initialData.joiningDate) {
      initialData.joiningDate = parseDate(initialData.joiningDate);
    }
    if (initialData.dob) {
      initialData.dob = parseDate(initialData.dob);
    }
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
              initialData={initialData || defaultData}
              onHandleSubmit={handleSubmit}
              formType="edit"
              feature={feature}
              defaultDepartment={defaultDepartment}
              isReadAllowed={isReadAllowed}
              defaultLocation={defaultLocation}
              edit={isAdmin}
            />
          )}
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}
export default memo(EditUser);
