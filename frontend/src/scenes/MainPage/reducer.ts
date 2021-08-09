import { Project } from '../../common/types';
import { createReducer } from '../../helpers';
import {
  fetchPopularAndRecommendedProjectsAction
} from './actions';
import type {
  FetchPopularAndRecommendedProjectsSuccessActionType
} from './actions';

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
  [fetchPopularAndRecommendedProjectsAction.TRIGGER](state) {
    return {
      ...state,
      isLoading: true
    };
  },
  [fetchPopularAndRecommendedProjectsAction.SUCCESS](state, action:
    FetchPopularAndRecommendedProjectsSuccessActionType) {
    return {
      ...state,
      isLoading: false,
      popular: action.payload.popular,
      recommended: action.payload.recommended
    };
  },
  [fetchPopularAndRecommendedProjectsAction.FAILURE](state) {
    return {
      ...state,
      isLoading: false
    };
  }
});

export default projectsReducer;
