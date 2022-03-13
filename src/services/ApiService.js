import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://reqres.in/api',
  responseType: 'json',
});

api.interceptors.request.use(config => {
  return {
    ...config,
    headers: {...config.headers},
  };
});
