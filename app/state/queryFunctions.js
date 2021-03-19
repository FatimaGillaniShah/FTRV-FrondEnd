import http from '../service/http';
import { APIS } from '../utils/constants';
import { insertParams } from '../utils/helper';

const {
  LOGIN,
  FILE_UPLOAD,
  USERS,
  USERS_LIST,
  USERS_DELETE,
  RETRIEVE_LINKS,
  CREATE_LINK,
  GET_LINK,
  UPDATE_LINK,
  DELETE_LINK,
} = APIS;

// USER CRUD

export const fetchUsers = ({ queryKey }) => {
  let url;
  if (queryKey[1].query) {
    url = `${`${USERS_LIST}?pageSize=1000&${insertParams(queryKey[1].query)}`}`;
  } else if (queryKey[1].filters) {
    url = `${USERS_LIST}?pageSize=1000&${insertParams(queryKey[1].filters)}`;
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

export const updateUser = (payload) => {
  const { id, updatedData } = payload;
  return http.put(`${USERS}/${id}`, updatedData);
};

export const getUserById = (id) => http.get(`${USERS}/${id}`);

export const uploadEmployeeFile = (payload) => http.post(FILE_UPLOAD, payload);

export const createUser = (payload) => http.post(USERS, payload);

export const login = (payload) => http.post(LOGIN, payload);

// USEFUL LINKS CRUD

export const fetchLinks = () => http.get(`${RETRIEVE_LINKS}?pageSize=1000&`);

export const createLink = (payload) => http.post(CREATE_LINK, payload);

export const getLinkById = (id) => http.get(`${GET_LINK}/${id}`);

export const updateLink = (payload) =>
  http.put(`${UPDATE_LINK}/${payload.id}`, payload);

export const deleteLink = (payload) =>
  http.delete(DELETE_LINK, { data: { ids: payload } });
