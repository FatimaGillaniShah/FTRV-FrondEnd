/**
 *
 * CreateUser
 *
 */

import { WrapInCard } from 'components';
import CreateNewUser from 'components/pages/createUser';
import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import { createUser } from 'state/queryFunctions';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import { navigateTo, Toast } from '../../utils/helper';
import { useAuthContext } from '../../context/authContext';
import { keys } from '../../state/queryKeys';
import { usePermission } from '../../hooks/permission';
import { PERMISSIONS } from '../../utils/constants';

function CreateUser() {
  const queryClient = useQueryClient();
  const history = useHistory();
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
  const {
    user: {
      data: { isAdmin },
    },
  } = useAuthContext();
  const mutation = useMutation(createUser, {
    onSuccess: () => {
      Toast({
        icon: 'success',
        title: `User Created Successfully`,
      });
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
        title: message,
      });
    },
  });

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
    locationId: '',
    departmentId: '',
    joiningDate: null,
    dob: null,
    file: undefined,
    groupIds: '',
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
          <CreateNewUser
            initialData={defaultData}
            mutation={mutation}
            feature={feature}
            onHandleSubmit={handleSubmit}
            formType="add"
            edit={isAdmin}
          />
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(CreateUser);
