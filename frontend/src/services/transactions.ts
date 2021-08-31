import { api } from '../helpers';

export const getPage = (pageNum: number) => api.get({ url: `payment/${pageNum}` });
