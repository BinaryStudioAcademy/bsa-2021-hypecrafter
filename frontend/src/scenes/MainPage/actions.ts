import { createRoutine } from 'redux-saga-routines';
import { Project } from '../../common/types';

export enum ProjectsActions {
  FETCH_POPULAR_AND_RECOMMENDED_PROJECTS = 'PROJECTS/GET_POPULAR_AND_RECOMMENDED'
}

export const fetchPopularAndRecommendedProjectsAction = createRoutine(ProjectsActions
  .FETCH_POPULAR_AND_RECOMMENDED_PROJECTS, {
  trigger: () => undefined,
  success: (projects: { popular: Project[], recommended: Project[] }) => projects,
  failure: (error: string) => error
});

export type FetchPopularAndRecommendedProjectsTriggerActionType =
  ReturnType<typeof fetchPopularAndRecommendedProjectsAction.trigger>

export type FetchPopularAndRecommendedProjectsSuccessActionType =
  ReturnType<typeof fetchPopularAndRecommendedProjectsAction.success>

export type FetchPopularAndRecommendedProjectsFailureActionType =
  ReturnType<typeof fetchPopularAndRecommendedProjectsAction.failure>
