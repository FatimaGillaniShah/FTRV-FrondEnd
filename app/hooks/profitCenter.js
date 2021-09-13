import { useMutation, useQueryClient } from 'react-query';
import Swal from 'sweetalert2';
import { deleteProfitCenter } from '../state/queryFunctions';
import { keys } from '../state/queryKeys';
import { Toast, isFunction } from '../utils/helper';

export function useDeleteProfitCenter({ callbackFn } = {}) {
  const queryClient = useQueryClient();
  return useMutation(deleteProfitCenter, {
    onSuccess: ({
      data: {
        data: { count },
      },
    }) => {
      if (isFunction(callbackFn)) callbackFn();
      Swal.fire('Deleted!', `${count} profit center(s) deleted.`, 'success');
      queryClient.invalidateQueries(keys.profitCenters({}));
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
