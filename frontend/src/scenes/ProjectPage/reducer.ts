import { Mark } from '../../common/enums';
import { ProjectPage } from '../../common/types';
import { createReducer } from '../../helpers';
import type { FetchProjectSuccessActionType, SetReactionSuccessActionType, SetWatchSuccessActionType } from './actions';
import { fetchProject, setReaction, setWatch } from './actions';

export interface ProjectPageState {
  isLoading: boolean;
  project: ProjectPage;
}

export const projectPageState: ProjectPageState = {
  isLoading: false,
  project: {} as ProjectPage
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
    let projectMark;

    if (mark === null) {
      projectMark = mark;
    } else {
      projectMark = mark ? Mark.LIKE : Mark.DISLIKE;
    }

    return {
      ...state,
      isLoading: false,
      project: { ...state.project, mark: projectMark, likes: Number(likes), dislikes: Number(dislikes) }
    };
  },
  [fetchProject.FAILURE](state) {
    return {
      ...state,
      isLoading: false
    };
  }
});

export default projectPageReducer;
