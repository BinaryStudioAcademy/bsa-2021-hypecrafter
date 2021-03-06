import { TimeInterval } from 'hypecrafter-shared/enums';
import { CreateProject, Project } from '../common/types';
import { Statistics } from '../common/types/project/statistics';
import { api } from '../helpers/http';

interface GetProjectProps {
  id: string;
  userId: string;
}

interface SetReactionProps {
  isLiked: boolean | null;
  projectId: string;
}

interface SetWatchProps {
  isWatched: boolean | null;
  projectId: string;
}

interface FetchStatistics {
  id: string;
  timeInterval: TimeInterval;
}

export const createProject = async (body: any) => {
  const project: CreateProject = await api.post({ url: 'projects', params: body });

  return project;
};

export const getForEditProject = (
  params: GetProjectProps
): Promise<CreateProject> => api.get({ url: `projects/getForEdit/${params.id}`, params });

export const getProject = (
  params: GetProjectProps
): Promise<Project> => api.get({ url: `projects/${params.id}`, params });

export const setReaction = (params: SetReactionProps) => api.post({ url: 'projects/reaction', params });

export const setWatch = (params: SetWatchProps) => api.post({ url: 'projects/watch', params });

export const getProjectsStatistics = async (params: FetchStatistics) => {
  const statistics: Statistics = await api.get({
    url: `projects/${params.id}/statistics`,
    params
  });
  return statistics;
};
