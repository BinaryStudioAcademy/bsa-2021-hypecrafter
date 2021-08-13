import { createRoutine } from 'redux-saga-routines';
import { Project } from './common/types';

export enum ProjectActions {
  GET_PROJECTS = 'PROJECTS/GET',
  FILTER_PROJECTS = 'PROJECTS/FILTER',
  SORT_PROJECTS = 'PROJECTS/SORT',
}

export const getProjectsAction = createRoutine(ProjectActions.GET_PROJECTS, {
  trigger: (projects: Project[]) => projects,
});

export const filterProjectsAction = createRoutine(ProjectActions.FILTER_PROJECTS, {
  trigger: (filterValue: string) => filterValue,
});

export const sortProjectsAction = createRoutine(ProjectActions.SORT_PROJECTS, {
  trigger: (sortValue: string) => sortValue,
});

export type GetProjectsActionType = ReturnType<typeof getProjectsAction>;
export type FilterProjectsActionType = ReturnType<typeof filterProjectsAction>;
export type SortProjectsActionType = ReturnType<typeof sortProjectsAction>;
