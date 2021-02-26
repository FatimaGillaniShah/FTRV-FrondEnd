import http from '../service/http';
import { APIS } from '../utils/constants';
import { insertParams } from '../utils/helper';

const { LOGIN, USERS_LIST } = APIS;

export const fetchUsers = async ({ queryKey }) => {
  const params = {
    q: queryKey[1].query,
  };
  let url;
  if (queryKey[1].query) {
    url = `${`${USERS_LIST}/${insertParams(params)}`}`;
  } else if (queryKey[1].filters) {
    url = USERS_LIST + insertParams(queryKey[1].filters);
  } else {
    url = USERS_LIST;
  }
  return http.get(url);
};

export const fetchUser = async () => {};

export const submitUser = async () => {};

export const uploadUsers = async () => {};

export const login = async (payload) => http.post(LOGIN, payload);
