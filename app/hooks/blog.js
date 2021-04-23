import { useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import { Toast } from '../components';
import { deleteBlog } from '../state/queryFunctions';
import { keys } from '../state/queryKeys';
import { isFunction } from '../utils/helper';

export function useDeleteBlog({ callbackFn } = {}) {
  const queryClient = useQueryClient();
  const history = useHistory();
  return useMutation(deleteBlog, {
    onSuccess: ({
      data: {
        data: { count },
      },
    }) => {
      if (isFunction(callbackFn)) callbackFn();
      Swal.fire('Deleted!', `${count} blog deleted.`, 'success');
      queryClient.invalidateQueries(keys.blog);
      history.push('/blogs');
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
