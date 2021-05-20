import { useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import { Toast } from '../components';
import { deleteLinkCategory } from '../state/queryFunctions';
import { keys } from '../state/queryKeys';

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  const history = useHistory();
  return useMutation(deleteLinkCategory, {
    onSuccess: () => {
      Swal.fire('Deleted!', `1 category deleted.`, 'success');
      queryClient.invalidateQueries(keys.linkCategory);
      history.push('/link-categories');
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
