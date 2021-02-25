import { APIS } from 'utils/constants';
import http from '../service/http';

export const fetchUsers = async () => {
  // return http.get('users');
};

// export const fetchUser = async (id) => {};

// export const submitUser = async (id) => {};

export const uploadEmployeeFile = async (file) =>
  http.post(APIS.FILE_UPLOAD, file);
