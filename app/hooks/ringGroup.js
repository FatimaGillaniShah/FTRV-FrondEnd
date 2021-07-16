import { useMutation, useQueryClient } from 'react-query';
import Swal from 'sweetalert2';
import { deleteRingGroup } from '../state/queryFunctions';
import { keys } from '../state/queryKeys';
import { Toast, isFunction } from '../utils/helper';

export function useDeleteRingGroup({ callbackFn } = {}) {
  const queryClient = useQueryClient();
  return useMutation(deleteRingGroup, {
    onSuccess: ({
      data: {
        data: { count },
      },
    }) => {
      if (isFunction(callbackFn)) callbackFn();
      Swal.fire('Deleted!', `${count} ring group(s) deleted.`, 'success');
      queryClient.invalidateQueries(keys.ringGroups);
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
