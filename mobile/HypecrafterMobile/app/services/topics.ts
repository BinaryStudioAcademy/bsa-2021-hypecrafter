import { api } from '../helpers/http';

export const getTopics = async () => {
  const topics = await api.get({ url: 'topics' });

  return topics;
};

