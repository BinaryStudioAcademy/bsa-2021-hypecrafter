import { TimeInterval } from 'hypecrafter-shared/enums';
import { createRoutine } from 'redux-saga-routines';
import { Comment, CreateComment, ProjectPage } from '../../common/types';
import { Statistics } from '../../common/types/project/statistics';

export enum ProjectsActions {
  FETCH_PROJECT = 'PROJECTS/GET_PROJECT',
  FETCH_STATISTICS = 'PROJECTS/FETCH_STATISTICS',
  ADD_COMMENT = 'COMMENTS/ADD_COMMENT',
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

interface FetchProjectStatisticsTriggerActionPropsType {
  id: string;
  timeInterval: TimeInterval;
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

export const fetchStatistics = createRoutine(ProjectsActions.FETCH_STATISTICS, {
  trigger: ({
    id,
    timeInterval
  }: FetchProjectStatisticsTriggerActionPropsType) => ({ id, timeInterval }),
  success: (statistics: Statistics) => statistics,
  failure: (error: string) => error
});

export type FetchStatisticsTriggerActionType = ReturnType<typeof fetchStatistics.trigger>;

export type FetchStatisticsSuccessActionType = ReturnType<typeof fetchStatistics.success>;

export type FetchStatisticsFailureActionType = ReturnType<typeof fetchStatistics.failure>;

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
