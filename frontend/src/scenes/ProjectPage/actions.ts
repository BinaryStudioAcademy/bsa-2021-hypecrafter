import { createRoutine } from 'redux-saga-routines';
import { Comment, CreateComment, ProjectPage } from '../../common/types';

export enum ProjectsActions {
  FETCH_PROJECT = 'PROJECTS/GET_PROJECT',
  ADD_COMMENT = 'COMMENTS/ADD_COMMENT'
}

export const fetchProject = createRoutine(ProjectsActions.FETCH_PROJECT, {
  trigger: (id: string) => id,
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

export type FetchProjectSuccessActionType = ReturnType<
  typeof fetchProject.success
>;

export type FetchProjectFailureActionType = ReturnType<
  typeof fetchProject.failure
>;
