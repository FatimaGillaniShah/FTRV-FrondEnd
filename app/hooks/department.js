import { useMutation, useQueryClient } from 'react-query';
import Swal from 'sweetalert2';
import { Toast } from '../components';
import { deleteDepartment } from '../state/queryFunctions';
import { keys } from '../state/queryKeys';
import { isFunction } from '../utils/helper';

export function useDeleteDepartment({ callbackFn } = {}) {
  const queryClient = useQueryClient();
  return useMutation(deleteDepartment, {
    onSuccess: ({
      data: {
        data: { count },
      },
    }) => {
      if (isFunction(callbackFn)) callbackFn();
      Swal.fire('Deleted!', `${count} department(s) deleted.`, 'success');
      queryClient.invalidateQueries(keys.departments);
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
