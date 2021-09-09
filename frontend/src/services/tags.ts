import { Tag } from '../common/types';
import { api } from '../helpers/http';

export const getPopularTags = async () => {
  const tags: Tag[] = await api.get({ url: 'tags/popular' });

  return tags;
};
export const getTags = async () => {
  const categories: Tag[] = await api.get({
    url: 'tags'
  });
  return categories;
};
