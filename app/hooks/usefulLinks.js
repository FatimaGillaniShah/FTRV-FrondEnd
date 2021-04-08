import { useMutation, useQueryClient } from 'react-query';
import Swal from 'sweetalert2';
import { Toast } from '../components';
import { deleteLink } from '../state/queryFunctions';
import { keys } from '../state/queryKeys';
import { isFunction } from '../utils/helper';

export function useDeleteLink({ callbackFn }) {
  const queryClient = useQueryClient();
  return useMutation(deleteLink, {
    onSuccess: ({
      data: {
        data: { count },
      },
    }) => {
      if (isFunction(callbackFn)) callbackFn();
      Swal.fire('Deleted!', `${count} link(s) deleted.`, 'success');
      queryClient.invalidateQueries(keys.links);
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
