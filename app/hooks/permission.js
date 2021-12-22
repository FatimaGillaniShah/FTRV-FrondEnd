import { useAuthContext } from '../context/authContext';

export function usePermission(resource) {
  const { user } = useAuthContext();
  const { data } = user;
  if (data.isAdmin) {
    return true;
  }
  const resourcePermission = resource?.split('-');
  const resourceName = resourcePermission[0];
  const permission = resourcePermission[1];
  const can = [];
  data.groups?.map(({ resources }) =>
    resources?.map(({ slug, permissions }) => {
      if (slug === resourceName) {
        permissions?.forEach((groupPermission) => {
          if (groupPermission === permission) {
            return can.push(true);
          }
          return false;
        });
      }
      return false;
    })
  );
  return can.length > 0;
}
