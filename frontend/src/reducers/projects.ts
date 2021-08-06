import { Project } from '../common/types';
import { createReducer } from '../helpers';
import {
  fetchRecommendedProjectsAction,
  fetchPopularProjectsAction
} from '../actions/projects';
import type {
  FetchPopularProjectsSuccessActionType,
  FetchRecommendedProjectsSuccessActionType
} from '../actions/projects';

export interface ProjectState {
  isLoading: boolean;
  popular: Project[];
  recommended: Project[];
}

export const projectState: ProjectState = {
  isLoading: false,
  popular: [],
  recommended: []
};

export const projectsReducer = createReducer<ProjectState>(projectState, {
  [fetchRecommendedProjectsAction.TRIGGER](state) {
    return {
      ...state,
      isLoading: true
    };
  },
  [fetchRecommendedProjectsAction.SUCCESS](state, action: FetchRecommendedProjectsSuccessActionType) {
    return {
      ...state,
      isLoading: false,
      recommended: action.payload
    };
  },
  [fetchRecommendedProjectsAction.FAILURE](state) {
    return {
      ...state,
      isLoading: false
    };
  },
  [fetchPopularProjectsAction.TRIGGER](state) {
    return {
      ...state,
      isLoading: true
    };
  },
  [fetchPopularProjectsAction.SUCCESS](state, action: FetchPopularProjectsSuccessActionType) {
    return {
      ...state,
      isLoading: false,
      popular: action.payload
    };
  },
  [fetchPopularProjectsAction.FAILURE](state) {
    return {
      ...state,
      isLoading: false
    };
  }
});

export default projectsReducer;
