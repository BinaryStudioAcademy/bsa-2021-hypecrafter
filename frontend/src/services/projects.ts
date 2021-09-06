import { ProjectsCategories, ProjectsFilter, ProjectsSort } from 'hypecrafter-shared/enums';
import { Project } from '../common/types';
import { api } from '../helpers/http';

interface GetProjectsProps {
  sort: ProjectsSort;
  filter: ProjectsFilter;
  categories: ProjectsCategories[];
  userId?: string;
}

export const getPopularProjectsByCategory = async (category: string) => {
  const projects = await api.get({
    url: 'projects/popular',
    params: {
      category
    }
  });

  return projects;
};

export const getProjects = async ({ sort, filter, categories, userId }: GetProjectsProps): Promise<Project[]> => {
  let projects: Project[];

  const stringifiedCategories = JSON.stringify(categories);

  if (userId) {
    projects = await api.get({ url: 'projects', params: { sort, filter, categories: stringifiedCategories, userId } });
  } else {
    projects = await api.get({ url: 'projects', params: { sort, filter, categories: stringifiedCategories } });
  }

  return projects;
};

export const getPopularAndRecommendedProjects = async () => {
  const projects: {
    recommended: Project[];
    popular: Project[]
  } = await api.get({ url: 'projects/popular-and-recommended' });
  return projects;
};

export const updateViewsAndInteraction = ({ id = '', ...params }) => (
  api.put({
    url: `projects/views-interaction/${id}`,
    params
  }));
