import http from '../service/http';
import { APIS } from '../utils/constants';

const { LOGIN, FILE_UPLOAD, USERS } = APIS;

export const fetchUsers = async () => {
  // return http.get('users');
};

export const fetchUser = async () => {};

export const submitUser = async () => {};

export const uploadUsers = async () => {};

export const createUser = async (payload) => http.post(USERS, payload);
export const updateUser = async (payload) => {
  const { id, userData } = payload;
  delete userData.id;
  delete userData.fullName;
  delete userData.avatar;
  delete userData.email;
  delete userData.role;
  delete userData.status;
  delete userData.joiningDate;
  http.put(`${USERS}/${id}`, userData);
};

export const getUserById = async (id) => http.get(`${USERS}/${id}`);

export const uploadEmployeeFile = async (file) => http.post(FILE_UPLOAD, file);

export const login = async (payload) => http.post(LOGIN, payload);
