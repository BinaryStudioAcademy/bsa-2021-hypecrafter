import {
  ProjectsCategories,
  ProjectsFilter,
  ProjectsSort
} from 'hypecrafter-shared/enums';
import { Project } from '../../common/types';
import { createReducer } from '../../helpers';
import {
  fetchProjectsAction,
  FetchProjectsFailureActionType,
  FetchProjectsSuccessActionType,
  filterCategoriesProjectsAction,
  FilterCategoriesProjectsActionType,
  filterProjectsAction,
  FilterProjectsActionType,
  sortProjectsAction,
  SortProjectsActionType, upcomingProjectsAction,
  UpcomingProjectsActionType, updateViewsAndInteractionTimeAction,
  UpdateViewsAndInteractionTimeFailureActionType, UpdateViewsAndInteractionTimeSuccessActionType
} from './actions';

export interface ProjectsState {
  projects: Project[];
  modificators: {
    sort: ProjectsSort;
    filter: ProjectsFilter;
    categories: ProjectsCategories[];
    upcoming: boolean;
  };
  isLoading: boolean;
  error: string;
}

export const initialState: ProjectsState = {
  projects: [],
  modificators: {
    sort: ProjectsSort.NAME,
    filter: ProjectsFilter.ALL,
    categories: [],
    upcoming: false
  },
  isLoading: false,
  error: '',
};

export const projectsReducer = createReducer<ProjectsState>(initialState, {
  [fetchProjectsAction.TRIGGER](state) {
    return {
      ...state,
      isLoading: true,
    };
  },
  [fetchProjectsAction.SUCCESS](state, action: FetchProjectsSuccessActionType) {
    return {
      ...state,
      isLoading: false,
      projects: action.payload,
    };
  },
  [fetchProjectsAction.FAILURE](state, action: FetchProjectsFailureActionType) {
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  },
  [sortProjectsAction.TRIGGER](state, action: SortProjectsActionType) {
    return {
      ...state,
      modificators: {
        ...state.modificators,
        sort: action.payload,
      },
    };
  },
  [filterProjectsAction.TRIGGER](state, action: FilterProjectsActionType) {
    return {
      ...state,
      modificators: {
        ...state.modificators,
        filter: action.payload,
      },
    };
  },
  [filterCategoriesProjectsAction.TRIGGER](state, action: FilterCategoriesProjectsActionType) {
    return {
      ...state,
      modificators: {
        ...state.modificators,
        categories: action.payload,
      },
    };
  },
  [updateViewsAndInteractionTimeAction.TRIGGER](state) {
    return {
      ...state
    };
  },
  [updateViewsAndInteractionTimeAction.SUCCESS](state, action: UpdateViewsAndInteractionTimeSuccessActionType) {
    return {
      ...state,
      projects: state.projects.map(project => (
        project.id !== action.payload.id
          ? project
          : {
            ...project,
            ...action.payload
          }
      ))
    };
  },
  [updateViewsAndInteractionTimeAction.FAILURE](state, action: UpdateViewsAndInteractionTimeFailureActionType) {
    return {
      ...state,
      error: action.payload
    };
  },
  [upcomingProjectsAction.TRIGGER](state, action: UpcomingProjectsActionType) {
    return {
      ...state,
      modificators: {
        ...state.modificators,
        upcoming: action.payload
      },
    };
  },
});

export default projectsReducer;
