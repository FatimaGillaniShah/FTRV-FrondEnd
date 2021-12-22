import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router';
import { useListGroup } from '../../hooks/group';
import { usePermission } from '../../hooks/permission';
import { bulkUserUpdate } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { features, PERMISSIONS } from '../../utils/constants';
import { getChangedValues } from '../../utils/functions';
import { navigateTo, Toast } from '../../utils/helper';
import { BulkEdit } from '../directory/bulkEdit';

function BulkEditUser() {
  const queryClient = useQueryClient();
  const history = useHistory();
  const { ids } = useParams();
  const isWriteAllowed = usePermission(`${features.GROUP}-${PERMISSIONS.READ}`);
  const { data: groupsResponse, isLoading: isGroupLoading } = useListGroup({
    enabled: isWriteAllowed,
    filters: { name: '' },
  });
  const groups = groupsResponse?.data?.data;
  const onEditUserSuccess = () => {
    Toast({
      icon: 'success',
      title: `User(s) Updated Successfully`,
    });
    queryClient.invalidateQueries(keys.getUsers({}));
    navigateTo(history, '/directory');
  };
  const onEditUserError = ({
    response: {
      data: { message },
    },
  }) => {
    Toast({
      icon: 'error',
      title: message || 'Some Error Occurred',
    });
  };
  const { mutate, isLoading: isUpdateLoading } = useMutation(bulkUserUpdate, {
    onSuccess: onEditUserSuccess,
    onError: onEditUserError,
  });
  const handleSubmit = (values) => {
    let payload = getChangedValues(values, initialValues);
    const groupId = values?.groupId?.map(({ id }) => id);
    const userIds = ids.split(',').map(Number);
    payload = {
      ...payload,
      userIds,
      groupId,
    };

    mutate(payload);
  };
  const initialValues = {
    groupId: [],
    departmentId: '',
    locationId: '',
  };
  return (
    <>
      <Helmet>
        <title>Bulk Edit User</title>
      </Helmet>
      <BulkEdit
        initialValues={initialValues}
        onHandleSubmit={handleSubmit}
        groups={groups}
        loading={isUpdateLoading}
        isGroupLoading={isGroupLoading}
      />
    </>
  );
}
export default memo(BulkEditUser);
