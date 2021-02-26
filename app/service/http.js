import axios from 'axios';

class Http {
  constructor() {
    const service = axios.create({
      baseURL: process.env.API_URL,
      headers: {
        common: {
          Accept: 'application/json',
        },
        // @ TODO add authorization after checked isauthenticated
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBmdHJ2LmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYxNDI0MTYwNH0.SPYYXrrOvxKpmzl0HBA1T99e7ryKsVQzCeIb8N2JTvM`,
      },
    });

    service.interceptors.request.use(
      (config) => {
        const { token } = JSON.parse(localStorage.getItem('user'));
        // eslint-disable-next-line no-param-reassign
        config.headers.common.Authorization = `Bearer ${token}`;
        if (config.url === 'users/upload') {
          // eslint-disable-next-line no-param-reassign
          config.headers.post['Content-Type'] = 'multipart/form-data';
        }

        return config;
      },
      (error) => {
        Promise.reject(error);
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
}
export default new Http();
