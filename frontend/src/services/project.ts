import { Project } from '../common/types';
import { api } from '../helpers/http';

export const createProject = async (body: any) => {
  const project: Project = await api.post({ url: 'projects', params: body });

  return project;
};

export const getProject = async (body: any) => {
  const project: Project = await api.get({ url: `projects/${body.id}`, params: body });

  return project;
};

export const setReaction = async (body: any) => {
  const project: Project = await api.post({ url: 'projects/like', params: body });

  return project;
};
