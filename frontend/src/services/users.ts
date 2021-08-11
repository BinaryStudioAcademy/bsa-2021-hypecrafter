import { api } from '../helpers';

export const getUser = (id: string) => api.get({ url: `users/${id}` });
