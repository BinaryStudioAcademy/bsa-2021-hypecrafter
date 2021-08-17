import { createRoutine } from 'redux-saga-routines';
import { Category, Tag } from '../../common/types';
import { ProjectItem } from './interfaces';

export enum TrendsPageActions {
  FETCH_POPULAR_TAGS = 'TAGS/FETCH_POPULAR_TAGS',
  FETCH_CATEGORIES = 'CATEGORIES/FETCH_CATEGORIES',
  SET_SELECTED_CATEGORY = 'CATEGORIES/SET_SELECTED_CATEGORY',
  FETCH_POPULAR_PROJECTS_BY_CATEGORY = 'PROJECTS/FETCH_POPULAR_PROJECTS_BY_CATEGORY'
}

export const setSelectedCategoryAction = (category: Category) => ({
  type: TrendsPageActions.SET_SELECTED_CATEGORY,
  payload: {
    ...category
  }
});

export const fetchPopularTagsAction = createRoutine(
  TrendsPageActions.FETCH_POPULAR_TAGS,
  {
    trigger: () => undefined,
    success: (tags: Tag[]) => tags,
    failure: (error: string) => error
  }
);

export const fetchCategories = createRoutine(
  TrendsPageActions.FETCH_CATEGORIES,
  {
    trigger: () => undefined,
    success: (categories: Category[]) => categories,
    failure: (error: string) => error
  }
);

export const fetchPopularProjectsByCategory = createRoutine(
  TrendsPageActions.FETCH_POPULAR_PROJECTS_BY_CATEGORY,
  {
    trigger: (category: string) => category,
    success: (projects: ProjectItem[]) => projects,
    failure: (error: string) => error
  }
);

export type SetSelectedCategoryActionType =
  typeof TrendsPageActions.SET_SELECTED_CATEGORY;

export type FetchPopularProjectsByCategoryTriggerActionType = ReturnType<
  typeof fetchPopularProjectsByCategory.trigger
>;

export type FetchPopularProjectsByCategorySuccessActionType = ReturnType<
  typeof fetchPopularProjectsByCategory.success
>;

export type FetchPopularProjectsByCategoryFailureActionType = ReturnType<
  typeof fetchPopularProjectsByCategory.failure
>;

export type FetchPopularTagsTriggerActionType = ReturnType<
  typeof fetchPopularTagsAction.trigger
>;

export type FetchPopularTagsSuccessActionType = ReturnType<
  typeof fetchPopularTagsAction.success
>;

export type FetchPopularTagsFailureActionType = ReturnType<
  typeof fetchPopularTagsAction.failure
>;

export type FetchCategoriesTriggerActionType = ReturnType<
  typeof fetchPopularTagsAction.trigger
>;

export type FetchCategoriesSuccessActionType = ReturnType<
  typeof fetchPopularTagsAction.success
>;

export type FetchCategoriesFailureActionType = ReturnType<
  typeof fetchPopularTagsAction.failure
>;
