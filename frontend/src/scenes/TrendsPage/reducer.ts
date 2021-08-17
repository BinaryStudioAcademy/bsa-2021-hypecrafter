import { Category, Tag } from '../../common/types';
import { createReducer } from '../../helpers';
import type {
  FetchCategoriesSuccessActionType,
  FetchPopularProjectsByCategorySuccessActionType,
  FetchPopularTagsSuccessActionType
} from './actions';
import {
  fetchCategories,
  fetchPopularProjectsByCategory,
  fetchPopularTagsAction,
  TrendsPageActions
} from './actions';
import { ProjectItem } from './interfaces';

export interface TrendsPageState {
  isLoadingTop: boolean;
  isLoadingBottom: boolean;
  tags: Tag[];
  categories: Category[];
  selectedCategory: Category | null;
  projects: ProjectItem[];
}

export const trendsPageState: TrendsPageState = {
  isLoadingTop: false,
  isLoadingBottom: false,
  tags: [],
  categories: [],
  selectedCategory: null,
  projects: []
};

export const trendsPageReducer = createReducer<TrendsPageState>(
  trendsPageState,
  {
    [fetchPopularTagsAction.TRIGGER](state) {
      return {
        ...state,
        isLoadingTop: true
      };
    },
    [fetchPopularTagsAction.SUCCESS](
      state,
      action: FetchPopularTagsSuccessActionType
    ) {
      return {
        ...state,
        isLoadingTop: false,
        tags: action.payload
      };
    },
    [fetchPopularTagsAction.FAILURE](state) {
      return {
        ...state,
        isLoadingTop: false
      };
    },
    [fetchCategories.TRIGGER](state) {
      return {
        ...state,
        isLoadingBottom: true
      };
    },
    [fetchCategories.SUCCESS](state, action: FetchCategoriesSuccessActionType) {
      return {
        ...state,
        isLoadingBottom: false,
        categories: action.payload
      };
    },
    [fetchCategories.FAILURE](state) {
      return {
        ...state,
        isLoadingBottom: false
      };
    },
    [fetchPopularProjectsByCategory.SUCCESS](
      state,
      action: FetchPopularProjectsByCategorySuccessActionType
    ) {
      return {
        ...state,
        isLoadingBottom: false,
        projects: action.payload
      };
    },
    [fetchPopularProjectsByCategory.FAILURE](state) {
      return {
        ...state,
        isLoadingBottom: false
      };
    },
    [fetchPopularProjectsByCategory.TRIGGER](state) {
      return {
        ...state,
        isLoadingBottom: true
      };
    },
    [TrendsPageActions.SET_SELECTED_CATEGORY](state, action) {
      return {
        ...state,
        selectedCategory: action.payload
      };
    }
  }
);

export default trendsPageReducer;
