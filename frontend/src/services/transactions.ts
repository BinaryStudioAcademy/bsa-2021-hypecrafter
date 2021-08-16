import { api } from '../helpers';

export const getPage = (userId: string, pageNum: number) => api.get({ url: `payment/${userId}/${pageNum}` });
