import { api } from '../helpers';

export const getUser = (id: string) => api.get({ url: `users/${id}` });
export const getUsers = () => api.get({ url: 'users' });

export const updateUser = ({ id = '', ...params }) => {
  if (!id || typeof params === 'undefined') throw Error();
  return api.put({
    url: `users/${id}`,
    params
  });
};
