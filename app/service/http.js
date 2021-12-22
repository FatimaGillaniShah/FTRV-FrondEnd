import axios from 'axios';
import { LOCAL_STORAGE_ENTRIES, STATUS_CODES } from '../utils/constants';
/* eslint-disable no-param-reassign */

class Http {
  constructor() {
    const service = axios.create({
      baseURL: process.env.API_URL,
      headers: {
        common: {
          Accept: 'application/json',
        },
      },
    });

    service.interceptors.request.use(
      (config) => {
        const user = localStorage.getItem(LOCAL_STORAGE_ENTRIES.user);
        if (user) {
          const { token, googleToken } = JSON.parse(user);
          config.headers.common.Authorization = `Bearer ${token}`;
          if (googleToken) {
            config.headers.GTOKEN = `${googleToken}`;
          }
        }

        return config;
      },
      (error) => Promise.reject(error)
    );
    service.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response) {
          const { status } = error.response;

          if (status === STATUS_CODES.FORBIDDEN) {
            window.location.href = '/access-denied';
          }
        }
        return Promise.reject(error);
      }
    );
    this.service = service;
  }

  get(path) {
    return this.service.get(path);
  }

  post(path, payload) {
    return this.service.post(path, payload);
  }

  put(path, payload) {
    return this.service.put(path, payload);
  }

  delete(path, payload) {
    return this.service.delete(path, payload);
  }
}
export default new Http();
