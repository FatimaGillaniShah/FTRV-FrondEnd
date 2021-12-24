import { useQuery, useQueryClient } from 'react-query';

export function useSharedState(key, initialValue) {
  const queryClient = useQueryClient();

  const { data: state } = useQuery(key, () => queryClient.getQueryData(key), {
    initialData: initialValue,
  });

  const setState = (value) => {
    queryClient.setQueryData(key, value);
  };

  return [state, setState];
}
