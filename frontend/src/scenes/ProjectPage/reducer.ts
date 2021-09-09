import { Mark } from '../../common/enums';
import { Mark as MarkType, ProjectPage } from '../../common/types';
import { Statistics } from '../../common/types/project/statistics';
import { createReducer } from '../../helpers';
import type {
  AddCommentSuccessActionType,
  FetchProjectSuccessActionType,
  FetchStatisticsSuccessActionType,
  SetReactionSuccessActionType,
  SetWatchSuccessActionType
} from './actions';
import {
  addComment,
  fetchProject,
  fetchStatistics,
  setReaction,
  setWatch
} from './actions';

export interface ProjectPageState {
  isLoading: boolean;
  project: ProjectPage;
  isInputLoading: boolean;
  error: string;
  statistics: Statistics;
}

export const projectPageState: ProjectPageState = {
  isLoading: false,
  project: {} as ProjectPage,
  isInputLoading: false,
  error: '',
  statistics: {} as Statistics
};

const projectPageReducer = createReducer<ProjectPageState>(projectPageState, {
  [fetchProject.TRIGGER](state) {
    return {
      ...state,
      isLoading: true
    };
  },
  [fetchProject.SUCCESS](state, action: FetchProjectSuccessActionType) {
    return {
      ...state,
      isLoading: false,
      project: action.payload
    };
  },
  [setWatch.SUCCESS](state, action: SetWatchSuccessActionType) {
    return {
      ...state,
      isLoading: false,
      project: {
        ...state.project,
        isWatched: action.payload
      }
    };
  },
  [setReaction.SUCCESS](state, action: SetReactionSuccessActionType) {
    const { mark, likes, dislikes } = action.payload;
    let projectMark: MarkType | null;

    if (mark === null) {
      projectMark = mark;
    } else {
      projectMark = mark ? Mark.LIKE : Mark.DISLIKE;
    }

    return {
      ...state,
      isLoading: false,
      project: { ...state.project, mark: projectMark, likes, dislikes }
    };
  },
  [fetchProject.FAILURE](state) {
    return {
      ...state,
      isLoading: false
    };
  },
  [addComment.TRIGGER](state) {
    return {
      ...state
    };
  },
  [addComment.SUCCESS](state, action: AddCommentSuccessActionType) {
    return {
      ...state,
      project: {
        ...state.project,
        projectComments: [...state.project.projectComments, action.payload]
      }
    };
  },
  [addComment.FAILURE](state) {
    return {
      ...state,
      isInputLoading: false
    };
  },
  [fetchStatistics.SUCCESS](state, action: FetchStatisticsSuccessActionType) {
    return {
      ...state,
      statistics: action.payload
    };
  },
});

export default projectPageReducer;
