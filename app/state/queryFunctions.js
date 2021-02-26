import http from '../service/http';
import { APIS } from '../utils/constants';

const { LOGIN, USERS_LIST } = APIS;

export const fetchUsers = async () => http.get(USERS_LIST);

export const fetchUser = async () => {};

export const submitUser = async () => {};

export const uploadUsers = async () => {};

export const login = async (payload) => http.post(LOGIN, payload);
