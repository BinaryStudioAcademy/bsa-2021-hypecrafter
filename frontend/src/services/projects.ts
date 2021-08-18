import { Project } from '../common/types';
import { api } from '../helpers/http';

export const getPopularAndRecommendedProjects = async () => {
  const projects: { recommended: Project[]; popular: Project[] } = await api.get({ url: 'projects' });

  return projects;
};

export const getPopularProjectsByCategory = async (category: string) => {
  const projects = await api.get({
    url: 'projects/popular',
    params: {
      category
    }
  });

  return projects;
};
