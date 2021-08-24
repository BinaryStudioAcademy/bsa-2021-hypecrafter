import { createRoutine } from 'redux-saga-routines';
import { ProjectPage } from '../../common/types';

export enum ProjectsActions {
  FETCH_PROJECT = 'PROJECTS/GET_PROJECT',
  SET_REACTION = 'PROJECTS/SET_REACTION'
}

interface SetReactionTriggerActionPropsType {
  isLiked: boolean | null;
  projectId: string;
}

export const fetchProject = createRoutine(ProjectsActions
  .FETCH_PROJECT, {
  trigger: (id: string) => id,
  success: (project: ProjectPage) => project,
  failure: (error: string) => error
});

export const setReaction = createRoutine(ProjectsActions
  .SET_REACTION, {
  trigger: ({ isLiked, projectId }: SetReactionTriggerActionPropsType) => ({
    isLiked, projectId
  }),
  success: (project: ProjectPage) => project,
  failure: (error: string) => error
});

export type FetchProjectSuccessActionType =
  ReturnType<typeof fetchProject.success>;

export type SetReactionSuccessActionType =
  ReturnType<typeof setReaction.success>;
