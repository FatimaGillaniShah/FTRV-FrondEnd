import { useMutation, useQueryClient } from 'react-query';
import Swal from 'sweetalert2';
import { deletePoll } from '../state/queryFunctions';
import { keys } from '../state/queryKeys';
import { Toast } from '../utils/helper';

export function useDeletePoll() {
  const queryClient = useQueryClient();
  return useMutation(deletePoll, {
    onSuccess: ({
      data: {
        data: { count },
      },
    }) => {
      Swal.fire('Deleted!', `${count}  poll(s) deleted.`, 'success');
      queryClient.invalidateQueries(keys.polls);
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
