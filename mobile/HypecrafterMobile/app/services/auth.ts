import { api } from '../helpers/http';

export const auth = async () => {
  const user = await api.get({ url: 'auth/current-user' });

  return user;
};