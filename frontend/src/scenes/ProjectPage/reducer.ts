import { Mark } from '../../common/enums';
import { Mark as MarkType, ProjectPage } from '../../common/types';
import { createReducer } from '../../helpers';
import type {
  AddCommentSuccessActionType, FetchProjectSuccessActionType,
  SetReactionSuccessActionType,
  SetWatchSuccessActionType,
  UpdateViewsAndInteractionTimeSuccessActionType,
  UpdateViewsAndInteractionTimeFailureActionType
} from './actions';
import {
  addComment,
  fetchProject,
  setReaction,
  setWatch,
  updateViewsAndInteractionTimeAction
} from './actions';

export interface ProjectPageState {
  isLoading: boolean;
  project: ProjectPage;
  isInputLoading: boolean;
  error: string;
}

export const projectPageState: ProjectPageState = {
  isLoading: false,
  project: {} as ProjectPage,
  isInputLoading: false,
  error: ''
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
      isInputLoading: false,
    };
  },
  [updateViewsAndInteractionTimeAction.TRIGGER](state) {
    return {
      ...state
    };
  },
  [updateViewsAndInteractionTimeAction.SUCCESS](state, action: UpdateViewsAndInteractionTimeSuccessActionType) {
    return {
      ...state,
      project: {
        ...state.project,
        ...action.payload
      }
    };
  },
  [updateViewsAndInteractionTimeAction.FAILURE](state, action: UpdateViewsAndInteractionTimeFailureActionType) {
    return {
      ...state,
      error: action.payload
    };
  }
});

export default projectPageReducer;
