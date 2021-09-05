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
  filterCategoryProjectsAction,
  FilterCategoryProjectsActionType,
  filterProjectsAction,
  FilterProjectsActionType,
  sortProjectsAction,
  SortProjectsActionType,
  updateViewsAndInteractionTimeAction,
  UpdateViewsAndInteractionTimeSuccessActionType,
  UpdateViewsAndInteractionTimeFailureActionType
} from './actions';

export interface ProjectsState {
  projects: Project[];
  modificators: {
    sort: ProjectsSort;
    filter: ProjectsFilter;
    category: ProjectsCategories;
  };
  isLoading: boolean;
  error: string;
}

export const initialState: ProjectsState = {
  projects: [],
  modificators: {
    sort: ProjectsSort.NAME,
    filter: ProjectsFilter.ALL,
    category: ProjectsCategories.ALL,
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
  [filterCategoryProjectsAction.TRIGGER](state, action: FilterCategoryProjectsActionType) {
    return {
      ...state,
      modificators: {
        ...state.modificators,
        category: action.payload,
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
  }
});

export default projectsReducer;
