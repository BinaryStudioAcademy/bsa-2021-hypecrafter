import { Category } from '../../common/types';
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
  setSelectedCategoryAction
} from './actions';
import { ProjectItem, TagWithQuantity } from './interfaces';

export interface TrendsPageState {
  isLoading: boolean;
  tags: TagWithQuantity[];
  categories: Category[];
  selectedCategory: Category | null;
  projects: ProjectItem[];
}

export const trendsPageState: TrendsPageState = {
  isLoading: false,
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
        isLoading: true
      };
    },
    [fetchPopularTagsAction.SUCCESS](
      state,
      action: FetchPopularTagsSuccessActionType
    ) {
      return {
        ...state,
        tags: action.payload
      };
    },
    [fetchPopularTagsAction.FAILURE](state) {
      return {
        ...state,
        isLoading: false
      };
    },
    [fetchCategories.TRIGGER](state) {
      return {
        ...state,
        isLoading: true
      };
    },
    [fetchCategories.SUCCESS](state, action: FetchCategoriesSuccessActionType) {
      return {
        ...state,
        isLoading: false,
        categories: action.payload
      };
    },
    [fetchCategories.FAILURE](state) {
      return {
        ...state,
        isLoading: false
      };
    },
    [fetchPopularProjectsByCategory.SUCCESS](
      state,
      action: FetchPopularProjectsByCategorySuccessActionType
    ) {
      return {
        ...state,
        isLoading: false,
        projects: action.payload
      };
    },
    [fetchPopularProjectsByCategory.FAILURE](state) {
      return {
        ...state,
        isLoading: false
      };
    },
    [fetchPopularProjectsByCategory.TRIGGER](state) {
      return {
        ...state,
        isLoading: true
      };
    },
    [setSelectedCategoryAction.SUCCESS](state, action) {
      return {
        ...state,
        selectedCategory: action.payload
      };
    },
    [setSelectedCategoryAction.TRIGGER](state) {
      return {
        ...state,
        isLoading: true
      };
    },
    [setSelectedCategoryAction.FAILURE](state) {
      return {
        ...state,
        isLoading: false
      };
    }
  }
);

export default trendsPageReducer;
