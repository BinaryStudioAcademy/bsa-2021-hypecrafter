import { createRoutine } from 'redux-saga-routines';
import { Project, CreateProject } from '../../common/types';

export enum ProjectActions {
  SAVE_PROJECT = 'PROJECT/SAVE'
}

export const createProjectAction = createRoutine(ProjectActions.SAVE_PROJECT, {
  trigger: (project: CreateProject) => project,
  success: (project: Project) => project,
  failure: (error: string) => error
});

export type CreateProjectTriggerActionType = ReturnType<typeof createProjectAction.trigger>;
export type CreateProjectSuccessActionType = ReturnType<typeof createProjectAction.success>;
export type CreateProjectFailureActionType = ReturnType<typeof createProjectAction.failure>;

