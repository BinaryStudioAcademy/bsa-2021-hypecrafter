import { ProjectPage } from '../../common/types';
import { createReducer } from '../../helpers';
import type { FetchProjectSuccessActionType, SetReactionSuccessActionType } from './actions';
import { fetchProject, setReaction } from './actions';

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
  [setReaction.SUCCESS](state, action: SetReactionSuccessActionType) {
    return {
      ...state,
      isLoading: false,
      project: action.payload
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
