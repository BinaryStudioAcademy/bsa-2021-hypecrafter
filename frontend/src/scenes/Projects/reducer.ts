import { createReducer } from '../../helpers';
import {
  filterProjectsAction,
  FilterProjectsActionType,
  getProjectsAction,
  GetProjectsActionType,
  sortProjectsAction,
  SortProjectsActionType
} from './actions';
import { FilterValues, SortValues } from './common/enums';
import { Project } from './common/types';

export interface ProjectsState {
  allProjects: Project[];
  projects: Project[];
}

export const initialState: ProjectsState = {
  allProjects: [],
  projects: [],
};

export const projectsReducer = createReducer<ProjectsState>(initialState, {
  [getProjectsAction.TRIGGER](state, action: GetProjectsActionType) {
    return {
      ...state,
      allProjects: action.payload,
      projects: action.payload,
    };
  },
  [sortProjectsAction.TRIGGER](state, action: SortProjectsActionType) {
    return {
      ...state,
      projects: [...state.allProjects].sort((projectA, projectB) => {
        switch (action.payload) {
          case SortValues.NAME:
            return projectA.Name >= projectB.Name ? 1 : -1;
          case SortValues.DATE:
            return new Date(projectA.CreatedAt) >= new Date(projectB.CreatedAt) ? 1 : -1;
          default:
            return 0;
        }
      }),
    };
  },
  [filterProjectsAction.TRIGGER](state, action: FilterProjectsActionType) {
    return {
      ...state,
      projects: state.allProjects.filter((project) => {
        switch (action.payload) {
          case FilterValues.FAVORITE:
            return project.isFavorite;
          case FilterValues.INVESTED:
            return project.isInvested;
          case FilterValues.OWN:
            return project.isOwn;
          case FilterValues.ALL:
            return true;
          default:
            return true;
        }
      }),
    };
  },
});

export default projectsReducer;
