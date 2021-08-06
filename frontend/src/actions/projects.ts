import { createRoutine } from 'redux-saga-routines';
import { Project } from '../common/types';

export enum ProjectsActions {
  FETCH_POPULAR_PROJECTS = 'PROJECTS/GET_POPULAR',
  FETCH_RECOMMENDED_PROJECTS = 'PROJECTS/GET_RECOMMENDED',
}

export const fetchPopularProjectsAction = createRoutine(ProjectsActions.FETCH_POPULAR_PROJECTS, {
  trigger: () => undefined,
  success: (projects: Project[]) => projects,
  failure: (error: string) => error
});

export const fetchRecommendedProjectsAction = createRoutine(ProjectsActions.FETCH_RECOMMENDED_PROJECTS, {
  trigger: () => undefined,
  success: (projects: Project[]) => projects,
  failure: (error: string) => error
});

export type FetchPopularProjectsTriggerActionType = ReturnType<typeof fetchPopularProjectsAction.trigger>
export type FetchPopularProjectsSuccessActionType = ReturnType<typeof fetchPopularProjectsAction.success>
export type FetchPopularProjectsFailureActionType = ReturnType<typeof fetchPopularProjectsAction.failure>

export type FetchRecommendedProjectsTriggerActionType = ReturnType<typeof fetchRecommendedProjectsAction.trigger>
export type FetchRecommendedProjectsSuccessActionType = ReturnType<typeof fetchRecommendedProjectsAction.success>
export type FetchRecommendedProjectsFailureActionType = ReturnType<typeof fetchRecommendedProjectsAction.failure>
