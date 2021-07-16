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

  const { mutate, isLoading } = useMutation(
    id ? updateRingGroup : createRingGroup,
    {
      onSuccess: () => {
        Toast({
          icon: 'success',
          title: `Ring Group ${id ? 'Updated' : 'Created'}  successfully`,
        });
        navigateTo(history, '/ring-groups');
        queryClient.invalidateQueries(keys.ringGroups);
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
          initialValues={id ? data?.data?.data : initialValues}
        />
      )}
    </>
  );
}

export default memo(CreateLinkCategory);
