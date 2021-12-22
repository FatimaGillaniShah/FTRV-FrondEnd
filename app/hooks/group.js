import { useMutation, useQuery, useQueryClient } from 'react-query';
import Swal from 'sweetalert2';
import { deleteGroup, getGroups } from '../state/queryFunctions';
import { keys } from '../state/queryKeys';
import { Toast, isFunction } from '../utils/helper';

export function useDeleteGroup({ callbackFn } = {}) {
  const queryClient = useQueryClient();

  return useMutation(deleteGroup, {
    onSuccess: ({
      data: {
        data: { count },
      },
    }) => {
      if (isFunction(callbackFn)) callbackFn();
      Swal.fire('Deleted!', `${count} group(s) deleted.`, 'success');
      queryClient.invalidateQueries(keys.groups({}));
      queryClient.removeQueries(keys.user);
    },
    onError: ({
      response: {
        data: { message },
      },
    }) => {
      Toast({
        icon: 'error',
        title: message || 'Some error occured',
      });
    },
  });
}

export function useListGroup({ enabled, filters }) {
  return useQuery(keys.groups(filters), getGroups, {
    keepPreviousData: true,
    enabled,
  });
}
