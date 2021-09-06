import { createRoutine } from 'redux-saga-routines';
import { CreateProject } from '../../common/types';

export enum ProjectActions {
  SAVE_PROJECT = 'PROJECT/SAVE',
  GET_EDITED = 'PROJECT/GET_EDITED'
}

export const createProjectAction = createRoutine(ProjectActions.SAVE_PROJECT, {
  trigger: (project: CreateProject) => project,
  success: (project: CreateProject) => project,
  failure: (error: string) => error
});
export const getForEditProjectAction = createRoutine(ProjectActions.GET_EDITED, {
  trigger: (id: string, userId: string | undefined) => ({ id, userId }),
  success: (project: CreateProject) => project,
  failure: (error: string) => error
});

export type CreateProjectTriggerActionType = ReturnType<typeof createProjectAction.trigger>;
export type CreateProjectSuccessActionType = ReturnType<typeof createProjectAction.success>;
export type CreateProjectFailureActionType = ReturnType<typeof createProjectAction.failure>;

export type GetForEditProjectTriggerActionType = ReturnType<typeof getForEditProjectAction.trigger>;
export type GetForEditProjectSuccessActionType = ReturnType<typeof getForEditProjectAction.success>;
export type GetForEditProjectFailureActionType = ReturnType<typeof getForEditProjectAction.failure>;

