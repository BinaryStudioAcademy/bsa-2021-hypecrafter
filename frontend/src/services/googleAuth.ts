import { api } from '../helpers';

export const googleAuth = async (token: string) => {
  const result = await api.post({
    url: 'auth/google/',
    params: { token }
  });
  return result;
};
