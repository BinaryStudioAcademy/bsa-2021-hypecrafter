import { SignupData } from '../common/types/signup';
import { api } from '../helpers';

export const register = async (data: SignupData) => {
  const result = await api.post({
    url: 'auth/register',
    params: data
  });
  return result;
};
