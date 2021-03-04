import http from '../service/http';
import { APIS } from '../utils/constants';
import { insertParams } from '../utils/helper';

const { LOGIN, FILE_UPLOAD, USERS, USERS_LIST, USERS_DELETE } = APIS;

export const fetchUsers = ({ queryKey }) => {
  let url;
  if (queryKey[1].query) {
    url = `${`${USERS_LIST}?pageSize=1000&${insertParams(queryKey[1].query)}`}`;
  } else if (queryKey[1].filters) {
    url = `${USERS_LIST}?pageSize=1&${insertParams(queryKey[1].filters)}`;
  } else {
    url = USERS_LIST;
  }
  return http.get(url);
};

export const fetchUser = async () => {};

export const deleteUser = (payload) =>
  http.delete(USERS_DELETE, { data: { ids: payload } });

export const submitUser = async () => {};

export const uploadUsers = async () => {};

export const updateUser = async (payload) => {
  const { id, updatedData } = payload;
  http.put(`${USERS}/${id}`, updatedData);
};

export const getUserById = async (id) => http.get(`${USERS}/${id}`);

export const uploadEmployeeFile = async (payload) =>
  http.post(FILE_UPLOAD, payload);

export const createUser = async (payload) => http.post(USERS, payload);

export const login = async (payload) => http.post(LOGIN, payload);
