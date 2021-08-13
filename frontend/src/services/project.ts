import { api } from '../helpers/http';

export const createProject = async () => {
  const project = await api.get({ url: 'projects' });
  return project;
};

