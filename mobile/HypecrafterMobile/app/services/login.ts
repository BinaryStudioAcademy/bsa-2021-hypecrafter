import { LoginData } from '../common/types';
import { api } from '../helpers';

export const login = async (params: LoginData) => {
  const result = await api.post({
    url: 'auth/login',
    params
  });
  return result;
};
