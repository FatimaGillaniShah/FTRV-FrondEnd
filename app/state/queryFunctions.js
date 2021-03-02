import http from '../service/http';
import { APIS } from '../utils/constants';
import { insertParams } from '../utils/helper';

const { LOGIN, FILE_UPLOAD, USERS_LIST, USERS_DELETE } = APIS;

export const fetchUsers = ({ queryKey }) => {
  let url;
  if (queryKey[1].query) {
    url = `${`${USERS_LIST}?pageSize=2&${insertParams(queryKey[1].query)}`}`;
  } else if (queryKey[1].filters) {
    url = `${USERS_LIST}?pageSize=1&${insertParams(queryKey[1].filters)}`;
  } else {
    url = USERS_LIST;
  }
  return http.get(url);
};

export const fetchUser = async () => {};

export const deleteUser = (payload) => http.delete(USERS_DELETE, payload);

export const submitUser = async () => {};

export const uploadEmployeeFile = async (file) => http.post(FILE_UPLOAD, file);

export const login = async (payload) => http.post(LOGIN, payload);
