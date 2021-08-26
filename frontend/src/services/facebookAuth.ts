import { api } from '../helpers';

export const facebookAuth = async (access_token: string) => {
  const result = await api.post({
    url: 'auth/facebook/',
    params: { access_token }
  });
  return result;
};
