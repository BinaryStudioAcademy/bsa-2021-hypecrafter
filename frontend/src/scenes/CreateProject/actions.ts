import { createRoutine } from 'redux-saga-routines';
import { Project } from '../../common/types/project';

export enum ProjectActions {
  CREATE_PROJECT = 'PROJECTS/CREATE'
}

export const createProjectAction = createRoutine(ProjectActions.CREATE_PROJECT, {
  trigger: (project: Project) => project,
  success: (project: Project) => project,
  failure: (error: string) => error
});

export type CreateProjectTriggerActionType = ReturnType<typeof createProjectAction.trigger>
export type CreateProjectSuccessActionType = ReturnType<typeof createProjectAction.success>
export type CreateProjectFailureActionType = ReturnType<typeof createProjectAction.failure>
