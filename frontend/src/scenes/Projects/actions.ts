import { ProjectsCategories, ProjectsFilter, ProjectsSort } from 'hypecrafter-shared/enums';
import { createRoutine } from 'redux-saga-routines';
import { Project } from '../../common/types';

export enum ProjectActions {
  FETCH_PROJECTS = 'PROJECTS/GET',
  FILTER_PROJECTS = 'PROJECTS/FILTER',
  FILTER_CATEGORY_PROJECTS = 'PROJECTS/FILTER/CATEGORY',
  SORT_PROJECTS = 'PROJECTS/SORT',
  UPCOMING_PROJECTS = 'PROJECTS/UPCOMING'
}

interface FetchProjectsTriggerActionPropsType {
  sort: ProjectsSort;
  filter: ProjectsFilter;
  categories: ProjectsCategories[];
  upcoming: boolean;
  userId?: string;
}

export const fetchProjectsAction = createRoutine(ProjectActions.FETCH_PROJECTS, {
  trigger: ({ sort, filter, categories, userId, upcoming }: FetchProjectsTriggerActionPropsType) => (
    { sort, filter, categories, upcoming, userId }
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

export const upcomingProjectsAction = createRoutine(ProjectActions.UPCOMING_PROJECTS, {
  trigger: (upcoming: boolean) => upcoming,
});

export type FetchProjectsTriggerActionType = ReturnType<typeof fetchProjectsAction.trigger>;
export type FetchProjectsSuccessActionType = ReturnType<typeof fetchProjectsAction.success>;
export type FetchProjectsFailureActionType = ReturnType<typeof fetchProjectsAction.failure>;
export type FilterProjectsActionType = ReturnType<typeof filterProjectsAction>;
export type FilterCategoriesProjectsActionType = ReturnType<typeof filterCategoriesProjectsAction>;
export type SortProjectsActionType = ReturnType<typeof sortProjectsAction>;
export type UpcomingProjectsActionType = ReturnType<typeof upcomingProjectsAction>;
