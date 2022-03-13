import {api} from './ApiService';

export const login = data => {
  return api.request({
    url: '/login',
    method: 'POST',
    data,
  });
};
