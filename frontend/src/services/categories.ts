import { api } from '../helpers';

export const getCategories = () => api.get({ url: 'categories' });
