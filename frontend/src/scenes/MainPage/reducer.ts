import { Project } from '../../common/types';
import { createReducer } from '../../helpers';
import {
  fetchPopularAndRecommendedProjectsAction
} from './actions';
import type {
  FetchPopularAndRecommendedProjectsSuccessActionType
} from './actions';

export interface MainPageState {
  isLoading: boolean;
  popular: Project[];
  recommended: Project[];
}

export const mainPageState: MainPageState = {
  isLoading: false,
  popular: [],
  recommended: []
};

export const mainPageReducer = createReducer<MainPageState>(mainPageState, {
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

export default mainPageReducer;
