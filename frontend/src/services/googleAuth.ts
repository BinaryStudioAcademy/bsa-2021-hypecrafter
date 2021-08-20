import { api } from '../helpers';

export const googleAuth = async () => {
  const result = await api.get({
    url: 'auth/google'
  });
  return result;
};
