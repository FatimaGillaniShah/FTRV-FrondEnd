import { useMutation, useQueryClient } from 'react-query';
import Swal from 'sweetalert2';
import { Toast, isFunction } from '../utils/helper';
import { deleteAnnouncement } from '../state/queryFunctions';
import { keys } from '../state/queryKeys';

export function useDeleteAnnouncement({ callbackFn } = {}) {
  const queryClient = useQueryClient();
  return useMutation(deleteAnnouncement, {
    onSuccess: ({
      data: {
        data: { count },
      },
    }) => {
      if (isFunction(callbackFn)) callbackFn();
      Swal.fire('Deleted!', `${count} announcement(s) deleted.`, 'success');
      queryClient.invalidateQueries(keys.adminAnnouncements);
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
