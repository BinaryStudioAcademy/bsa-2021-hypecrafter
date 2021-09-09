import { createRoutine } from 'redux-saga-routines';
import { SearchResult } from '../common/types';

export enum SearchActions {
  SEARCH = 'SEARCH',
}

export const searchAction = createRoutine(SearchActions.SEARCH, {
  trigger: (query: string) => ({ query }),
  success: (result: SearchResult[]) => result,
  failure: (error: string) => error
});

export type SearchTriggerActionType = ReturnType<typeof searchAction.trigger>;
export type SearchSuccessActionType = ReturnType<typeof searchAction.success>;
export type SearchFailureActionType = ReturnType<typeof searchAction.failure>;

