import http from '../service/http';
import { APIS } from '../utils/constants';

const { LOGIN, FILE_UPLOAD } = APIS;

export const fetchUsers = async () => {
  // return http.get('users');
};

export const fetchUser = async () => {};

export const submitUser = async () => {};

export const uploadUsers = async () => {};

export const uploadEmployeeFile = async (file) => http.post(FILE_UPLOAD, file);

export const login = async (payload) => http.post(LOGIN, payload);
