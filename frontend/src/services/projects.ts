import { ProjectsCategories, ProjectsFilter, ProjectsSort } from 'hypecrafter-shared/enums';
import { Project } from '../common/types';
import { api } from '../helpers/http';

interface GetProjectsProps {
  sort: ProjectsSort;
  filter: ProjectsFilter;
  category: ProjectsCategories;
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

export const getProjects = async ({ sort, filter, category, userId }: GetProjectsProps): Promise<Project[]> => {
  let projects: Project[];

  if (userId) {
    projects = await api.get({ url: 'projects', params: { sort, filter, category, userId } });
  } else {
    projects = await api.get({ url: 'projects', params: { sort, filter, category } });
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

export const updateViewsAndInteraction = ({ id = '', ...params }) => {
  if (!id || typeof params === 'undefined') throw Error();
  return api.put({
    url: `views-interaction/${id}`,
    params
  });
};
