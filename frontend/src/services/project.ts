import { Project } from '../common/types';
import { api } from '../helpers/http';

export const createProject = async (body:any) => {
  const project: Project = await api.put({ url: 'projects', params: body });
  return project;
};

export const getProject = async (id: string) => {
  const project: Project = await api.get({ url: `projects/${id}` });

  return project;
};
