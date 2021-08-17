import { Project } from '../common/types';
import { api } from '../helpers/http';

export const createProject = () => Promise.resolve({ name: 'First Project' });

export const getProject = async (id: string) => {
  const project: Project = await api.get({ url: `projects/${id}` });
  console.log(project);
  return project;
};
