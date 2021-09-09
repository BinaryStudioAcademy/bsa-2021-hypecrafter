import { createRoutine } from 'redux-saga-routines';
import { ProjectPage } from '../../common/types';

export enum ProjectsActions {
  FETCH_PROJECT = 'PROJECTS/GET_PROJECT',
  SET_REACTION = 'PROJECTS/SET_REACTION',
  SET_WATCH = 'PROJECTS/SET_WATCH'
}

interface SetReactionTriggerActionPropsType {
  isLiked: boolean | null;
  projectId: string;
}

interface SetWatchTriggerActionPropsType {
  isWatched: boolean | null;
  projectId: string;
}

interface FetchProjectTriggerActionPropsType {
  id: string;
  userId: string | undefined;
}

export const fetchProject = createRoutine(ProjectsActions
  .FETCH_PROJECT, {
  trigger: ({ id, userId }: FetchProjectTriggerActionPropsType) => ({ id, userId }),
  success: (project: ProjectPage) => project,
  failure: (error: string) => error
});

export type FetchProjectTriggerActionType = ReturnType<
  typeof fetchProject.trigger
>;
export const setReaction = createRoutine(ProjectsActions
  .SET_REACTION, {
  trigger: ({ isLiked, projectId }: SetReactionTriggerActionPropsType) => ({
    isLiked, projectId
  }),
  success: (mark: boolean | null, likes: number, dislikes: number) => ({ mark, likes, dislikes }),
  failure: (error: string) => error
});

export const setWatch = createRoutine(ProjectsActions
  .SET_WATCH, {
  trigger: ({ isWatched, projectId }: SetWatchTriggerActionPropsType) => ({
    isWatched, projectId
  }),
  success: (isWatched: boolean) => isWatched,
  failure: (error: string) => error
});

export type FetchProjectSuccessActionType = ReturnType<
  typeof fetchProject.success
>;

export type FetchProjectFailureActionType = ReturnType<
  typeof fetchProject.failure
>;
export type SetReactionSuccessActionType =
  ReturnType<typeof setReaction.success>;

export type SetWatchSuccessActionType =
  ReturnType<typeof setWatch.success>;
