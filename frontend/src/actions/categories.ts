import { createRoutine } from 'redux-saga-routines';
import { Category } from '../common/types';

export enum CategoriesActions {
  GET_CATEGORIES = 'CATEGORIES'
}
export const getCategoriesAction = createRoutine(CategoriesActions.GET_CATEGORIES, {
  trigger: () => undefined,
  success: (categories: Category[]) => categories,
  failure: (error: string) => error
});

export type GetCategoriesTriggerActionType = ReturnType<typeof getCategoriesAction.trigger>;
export type GetCategoriesSuccessActionType = ReturnType<typeof getCategoriesAction.success>;
export type GetCategoriesFailureActionType = ReturnType<typeof getCategoriesAction.failure>;
