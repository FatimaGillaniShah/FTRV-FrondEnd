import { useMutation } from 'react-query';
import { Toast } from '../components';
import { createDepartment } from '../state/queryFunctions';

export function useCreateDepartment() {
  return useMutation(createDepartment, {
    onSuccess: () => {
      Toast({
        icon: 'success',
        title: 'Department created successfully',
      });
    },
    onError: ({
      response: {
        data: { message },
      },
    }) => {
      Toast({
        icon: 'error',
        title: message,
      });
    },
  });
}
