import { useMutation, useQueryClient } from 'react-query';
import Swal from 'sweetalert2';
import { deleteDocument } from '../state/queryFunctions';
import { keys } from '../state/queryKeys';
import { Toast } from '../utils/helper';

export function useDeleteDocument() {
  const queryClient = useQueryClient();
  return useMutation(deleteDocument, {
    onSuccess: ({
      data: {
        data: { count },
      },
    }) => {
      Swal.fire('Deleted!', `${count}  document(s) deleted.`, 'success');
      queryClient.invalidateQueries(keys.documentDepartment);
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
