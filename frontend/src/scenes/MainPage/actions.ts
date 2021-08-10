import { createRoutine } from 'redux-saga-routines';
import { Project, Topic } from '../../common/types';

export enum ProjectsActions {
  FETCH_POPULAR_AND_RECOMMENDED_PROJECTS = 'PROJECTS/GET_POPULAR_AND_RECOMMENDED',
  FETCH_TOPICS = 'PROJECTS/GET_TOPICS'
}

export const fetchPopularAndRecommendedProjectsAction = createRoutine(ProjectsActions
  .FETCH_POPULAR_AND_RECOMMENDED_PROJECTS, {
  trigger: () => undefined,
  success: (projects: { popular: Project[], recommended: Project[] }) => projects,
  failure: (error: string) => error
});

export const fetchTopics = createRoutine(ProjectsActions
  .FETCH_TOPICS, {
  trigger: () => undefined,
  success: (topics: Topic[]) => topics,
  failure: (error: string) => error
});

export type FetchPopularAndRecommendedProjectsTriggerActionType =
  ReturnType<typeof fetchPopularAndRecommendedProjectsAction.trigger>

export type FetchPopularAndRecommendedProjectsSuccessActionType =
  ReturnType<typeof fetchPopularAndRecommendedProjectsAction.success>

export type FetchPopularAndRecommendedProjectsFailureActionType =
  ReturnType<typeof fetchPopularAndRecommendedProjectsAction.failure>

export type FetchTopics = ReturnType<typeof fetchTopics.success>

