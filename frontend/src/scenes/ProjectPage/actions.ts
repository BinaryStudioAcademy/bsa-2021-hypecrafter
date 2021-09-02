/* eslint-disable max-len */

import { createRoutine } from 'redux-saga-routines';
import {
  Comment,
  CreateComment,
  ProjectPage,
  ViewsAndInteractionTimeQuery,
  ViewsAndInteractionTimeResponse
} from '../../common/types';

export enum ProjectsActions {
  FETCH_PROJECT = 'PROJECTS/GET_PROJECT',
  ADD_COMMENT = 'COMMENTS/ADD_COMMENT',
  SET_REACTION = 'PROJECTS/SET_REACTION',
  SET_WATCH = 'PROJECTS/SET_WATCH',
  UPDATE_VIEWS_AND_INTERACTION_TIME = 'PROJECTS/UPDATE_VIEWS_AND_INTERACTION_TIME'
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

export const addComment = createRoutine(ProjectsActions.ADD_COMMENT, {
  trigger: (data: CreateComment) => data,
  success: (comment: Comment) => comment,
  failure: (error: string) => error
});

export type AddCommentTriggerActionType = ReturnType<typeof addComment.trigger>;

export type AddCommentSuccessActionType = ReturnType<typeof addComment.success>;

export type AddCommentFailureActionType = ReturnType<typeof addComment.failure>;

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

export const updateViewsAndInteractionTimeAction = createRoutine(ProjectsActions.UPDATE_VIEWS_AND_INTERACTION_TIME, {
  trigger: (interactionTimeQuery: ViewsAndInteractionTimeQuery) => interactionTimeQuery,
  success: (donatesViewsAndInteractionTime: ViewsAndInteractionTimeResponse) => donatesViewsAndInteractionTime,
  failure: (error: string) => error
});

export type UpdateViewsAndInteractionTimeTriggerActionType = ReturnType<typeof updateViewsAndInteractionTimeAction.trigger>;
export type UpdateViewsAndInteractionTimeSuccessActionType = ReturnType<typeof updateViewsAndInteractionTimeAction.success>;
export type UpdateViewsAndInteractionTimeFailureActionType = ReturnType<typeof updateViewsAndInteractionTimeAction.failure>;

