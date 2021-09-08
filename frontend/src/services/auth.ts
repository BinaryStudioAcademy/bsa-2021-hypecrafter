import { api } from '../helpers/http';

export const auth = async () => {
  const user = await api.get({ url: 'auth/current-user' });

  return user;
};

export const updateUser = ({ id = '', ...params }) => {
  if (!id || typeof params === 'undefined') throw Error();
  return api.put({
    url: `users/${id}`,
    params
  });
};
