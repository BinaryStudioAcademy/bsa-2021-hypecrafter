import { createRoutine } from 'redux-saga-routines';
import { CreateProject, Project } from '../../common/types';
import { RecommendedProject } from './types';

export enum ProjectActions {
  SAVE_PROJECT = 'PROJECT/SAVE',
  GET_RECOMMENDED_PROJECTS = 'PROJECT/GET_RECOMMENDED_PROJECTS'
}

export const createProjectAction = createRoutine(ProjectActions.SAVE_PROJECT, {
  trigger: (project: CreateProject) => project,
  success: (project: Project) => project,
  failure: (error: string) => error
});

export type CreateProjectTriggerActionType = ReturnType<typeof createProjectAction.trigger>;
export type CreateProjectSuccessActionType = ReturnType<typeof createProjectAction.success>;
export type CreateProjectFailureActionType = ReturnType<typeof createProjectAction.failure>;

export const fetchRecommendedProjectsAction = createRoutine(ProjectActions.GET_RECOMMENDED_PROJECTS, {
  trigger: ({ category, region, projectTags }: {
    category: string,
    region: string,
    projectTags: string[]
  }) => ({ category, region, projectTags }),
  success: (project: RecommendedProject[]) => project,
  failure: (error: string) => error
});

export type FetchRecommendedProjectsTriggerActionType = ReturnType<typeof fetchRecommendedProjectsAction.trigger>;
export type FetchRecommendedProjectsSuccessActionType = ReturnType<typeof fetchRecommendedProjectsAction.success>;
export type FetchRecommendedProjectsFailureActionType = ReturnType<typeof fetchRecommendedProjectsAction.failure>;
