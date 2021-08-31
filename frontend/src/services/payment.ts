import { ClientSecretData } from '../common/types/payment';
import { api } from '../helpers';

export const getClientSecret = async (params: ClientSecretData):Promise<string> => {
  const { clientSecret }:{ clientSecret: string } = await api.post({ url: 'payment/create-payment-intent', params });
  return clientSecret;
};
