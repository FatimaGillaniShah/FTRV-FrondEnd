import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router';
import { Loading } from '../../components/loading';
import CreateRingGroupPage from '../../components/pages/createRingGroup';
import {
  createRingGroup,
  getRingGroupById,
  updateRingGroup,
} from '../../state/queryFunctions';
import { navigateTo, Toast } from '../../utils/helper';
import { keys } from '../../state/queryKeys';

function CreateLinkCategory() {
  const history = useHistory();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading: isRingGroupLoading } = useQuery(
    keys.getRingGroup(id),
    getRingGroupById,
    {
      enabled: !!id,
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
  let ringGroup = data?.data?.data;
  ringGroup = {
    id,
    name: ringGroup?.name,
    extension: ringGroup?.extension,
    departmentId: ringGroup?.department?.id,
    locationId: ringGroup?.location?.id,
  };
  const { mutate, isLoading } = useMutation(
    id ? updateRingGroup : createRingGroup,
    {
      onSuccess: () => {
        Toast({
          icon: 'success',
          title: `Ring Group ${id ? 'Updated' : 'Created'}  successfully`,
        });
        queryClient.invalidateQueries(keys.ringGroups);
        navigateTo(history, '/ring-group');
        if (id) queryClient.invalidateQueries(keys.getRingGroup(id));
      },
      onError: ({
        response: {
          data: { message },
        },
      }) =>
        Toast({
          icon: 'error',
          title: message || 'Some error occurred',
        }),
    }
  );

  const handleSubmit = (values) => {
    mutate(values);
  };
  const initialValues = {
    name: '',
    extension: '',
    locationId: '',
    departmentId: '',
  };
  return (
    <>
      <Helmet>
        <title>{id ? 'Edit' : 'Create'} Ring Group</title>
      </Helmet>
      {isLoading || isRingGroupLoading ? (
        <Loading />
      ) : (
        <CreateRingGroupPage
          id={id}
          onHandleSubmit={handleSubmit}
          initialValues={id ? ringGroup : initialValues}
        />
      )}
    </>
  );
}

export default memo(CreateLinkCategory);
