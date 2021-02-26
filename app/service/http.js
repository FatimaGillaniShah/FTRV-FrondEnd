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
