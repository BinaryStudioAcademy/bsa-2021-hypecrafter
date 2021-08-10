import { Project, Topic } from '../../common/types';
import { createReducer } from '../../helpers';
import { fetchPopularAndRecommendedProjectsAction, fetchTopics } from './actions';
import type { FetchPopularAndRecommendedProjectsSuccessActionType, FetchTopics } from './actions';

export interface MainPageState {
  isLoading: boolean;
  popular: Project[];
  recommended: Project[];
  topics: Topic[]
}

export const mainPageState: MainPageState = {
  isLoading: false,
  popular: [],
  recommended: [],
  topics: []
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
  },
  [fetchTopics.SUCCESS](state, action:
    FetchTopics) {
    return {
      ...state,
      isLoading: false,
      topics: action.payload
    };
  }
});

export default mainPageReducer;
