import { Category } from '../common/types';
import { api } from '../helpers/http';

export const getCategories = async () => {
  const categories: Category[] = await api.get({
    url: 'categories'
  });

  return categories;
};
