import { useMutation } from 'react-query';
import { Toast } from '../components';
import { createLocation } from '../state/queryFunctions';

export function useCreateLocation() {
  return useMutation(createLocation, {
    onSuccess: () => {
      Toast({
        icon: 'success',
        title: 'Location created successfully',
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
