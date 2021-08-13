import { createRoutine } from 'redux-saga-routines';
import { Project } from '../../common/types';

export enum ProjectsActions {
  FETCH_PROJECT = 'PROJECTS/GET_PROJECT'
}

export const fetchProject = createRoutine(ProjectsActions
  .FETCH_PROJECT, {
  trigger: (id: string) => id,
  success: (project: Project) => project,
  failure: (error: string) => error
});

export type FetchProjectTriggerActionType =
  ReturnType<typeof fetchProject.trigger>;

export type FetchProjectSuccessActionType =
  ReturnType<typeof fetchProject.success>;

export type FetchProjectFailureActionType =
  ReturnType<typeof fetchProject.failure>;
