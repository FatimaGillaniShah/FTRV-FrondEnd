import http from '../service/http';
import { APIS } from '../utils/constants';

const { LOGIN } = APIS;

export const fetchUsers = async () => {
  // return http.get('users');
};

export const fetchUser = async (id) => {};

export const submitUser = async (id) => {};

export const uploadUsers = async () => {};

export const login = async (payload) => http.post(LOGIN, payload);
