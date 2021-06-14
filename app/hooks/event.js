import { useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import { Toast, isFunction } from '../utils/helper';
import { deleteEvents } from '../state/queryFunctions';
import { keys } from '../state/queryKeys';

export function useDeleteEvent({ callbackFn } = {}) {
  const queryClient = useQueryClient();
  const history = useHistory();
  return useMutation(deleteEvents, {
    onSuccess: ({
      data: {
        data: { count },
      },
    }) => {
      if (isFunction(callbackFn)) callbackFn();
      Swal.fire('Deleted!', `${count} event deleted.`, 'success');
      queryClient.invalidateQueries(keys.events);
      history.push('/events');
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
