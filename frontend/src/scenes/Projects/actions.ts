/* eslint-disable max-len */
import { ProjectsCategories, ProjectsFilter, ProjectsSort } from 'hypecrafter-shared/enums';
import { createRoutine } from 'redux-saga-routines';
import {
  Project,
  ViewsAndInteractionTimeQuery,
  ViewsAndInteractionTimeResponse
} from '../../common/types';

export enum ProjectActions {
  FETCH_PROJECTS = 'PROJECTS/GET',
  FILTER_PROJECTS = 'PROJECTS/FILTER',
  FILTER_CATEGORY_PROJECTS = 'PROJECTS/FILTER/CATEGORY',
  SORT_PROJECTS = 'PROJECTS/SORT',
  UPDATE_VIEWS_AND_INTERACTION_TIME = 'PROJECTS/UPDATE_VIEWS_AND_INTERACTION_TIME'
}

interface FetchProjectsTriggerActionPropsType {
  sort: ProjectsSort;
  filter: ProjectsFilter;
  categories: ProjectsCategories[];
  userId?: string;
}

export const fetchProjectsAction = createRoutine(ProjectActions.FETCH_PROJECTS, {
  trigger: ({ sort, filter, categories, userId }: FetchProjectsTriggerActionPropsType) => (
    { sort, filter, categories, userId }
  ),
  success: (projects: Project[]) => projects,
  failure: (error: string) => error,
});

export const filterProjectsAction = createRoutine(ProjectActions.FILTER_PROJECTS, {
  trigger: (filterValue: ProjectsFilter) => filterValue,
});

export const filterCategoriesProjectsAction = createRoutine(ProjectActions.FILTER_CATEGORY_PROJECTS, {
  trigger: (categories: ProjectsCategories[]) => categories,
});

export const sortProjectsAction = createRoutine(ProjectActions.SORT_PROJECTS, {
  trigger: (sortValue: ProjectsSort) => sortValue,
});

export const updateViewsAndInteractionTimeAction = createRoutine(ProjectActions.UPDATE_VIEWS_AND_INTERACTION_TIME, {
  trigger: (interactionTimeQuery: ViewsAndInteractionTimeQuery) => interactionTimeQuery,
  success: (donatesViewsAndInteractionTime: ViewsAndInteractionTimeResponse) => donatesViewsAndInteractionTime,
  failure: (error: string) => error
});

export type FetchProjectsTriggerActionType = ReturnType<typeof fetchProjectsAction.trigger>;
export type FetchProjectsSuccessActionType = ReturnType<typeof fetchProjectsAction.success>;
export type FetchProjectsFailureActionType = ReturnType<typeof fetchProjectsAction.failure>;
export type FilterProjectsActionType = ReturnType<typeof filterProjectsAction>;
export type FilterCategoriesProjectsActionType = ReturnType<typeof filterCategoriesProjectsAction>;
export type SortProjectsActionType = ReturnType<typeof sortProjectsAction>;
export type UpdateViewsAndInteractionTimeTriggerActionType = ReturnType<typeof updateViewsAndInteractionTimeAction.trigger>;
export type UpdateViewsAndInteractionTimeSuccessActionType = ReturnType<typeof updateViewsAndInteractionTimeAction.success>;
export type UpdateViewsAndInteractionTimeFailureActionType = ReturnType<typeof updateViewsAndInteractionTimeAction.failure>;
