import { api } from '../helpers/http';

export const getTopics = async () => {
  localStorage.setItem('ACCESS_TOKEN', 'aaaaaa');
  const topics = await api.get({ url: 'topics' });
  return topics;
};

