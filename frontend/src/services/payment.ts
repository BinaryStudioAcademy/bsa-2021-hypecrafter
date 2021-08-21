import { ClientSecretData } from '../common/types/payment';
import { api } from '../helpers';

export const getClientSecret = (params: ClientSecretData) => api.post({ url: 'payment/create-payment-intent', params });
