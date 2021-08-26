import { ProjectsCategories, ProjectsFilter, ProjectsSort } from 'hypecrafter-shared/enums';
import { createRoutine } from 'redux-saga-routines';
import { Project } from '../../common/types';

export enum ProjectActions {
  FETCH_PROJECTS = 'PROJECTS/GET',
  FILTER_PROJECTS = 'PROJECTS/FILTER',
  FILTER_CATEGORY_PROJECTS = 'PROJECTS/FILTER/CATEGORY',
  SORT_PROJECTS = 'PROJECTS/SORT',
}

interface FetchProjectsTriggerActionPropsType {
  sort: ProjectsSort;
  filter: ProjectsFilter;
  category: ProjectsCategories;
  userId?: string;
}

export const fetchProjectsAction = createRoutine(ProjectActions.FETCH_PROJECTS, {
  trigger: ({ sort, filter, category, userId }: FetchProjectsTriggerActionPropsType) => (
    { sort, filter, category, userId }
  ),
  success: (projects: Project[]) => projects,
  failure: (error: string) => error,
});

export const filterProjectsAction = createRoutine(ProjectActions.FILTER_PROJECTS, {
  trigger: (filterValue: ProjectsFilter) => filterValue,
});

export const filterCategoryProjectsAction = createRoutine(ProjectActions.FILTER_CATEGORY_PROJECTS, {
  trigger: (categoryValue: ProjectsCategories) => categoryValue,
});

export const sortProjectsAction = createRoutine(ProjectActions.SORT_PROJECTS, {
  trigger: (sortValue: ProjectsSort) => sortValue,
});

export type FetchProjectsTriggerActionType = ReturnType<typeof fetchProjectsAction.trigger>;
export type FetchProjectsSuccessActionType = ReturnType<typeof fetchProjectsAction.success>;
export type FetchProjectsFailureActionType = ReturnType<typeof fetchProjectsAction.failure>;
export type FilterProjectsActionType = ReturnType<typeof filterProjectsAction>;
export type FilterCategoryProjectsActionType = ReturnType<typeof filterCategoryProjectsAction>;
export type SortProjectsActionType = ReturnType<typeof sortProjectsAction>;
