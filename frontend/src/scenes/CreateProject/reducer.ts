import { Routes } from '../../common/enums';
import { CreateProject as Project } from '../../common/types';
import { createReducer } from '../../helpers';
import {
  createProjectAction,
  CreateProjectFailureActionType,
  CreateProjectSuccessActionType,
  fetchRecommendedProjectsAction,
  FetchRecommendedProjectsFailureActionType,
  FetchRecommendedProjectsSuccessActionType, getForEditProjectAction, GetForEditProjectFailureActionType,
  GetForEditProjectSuccessActionType
} from './actions';
import { RecommendedProject } from './types';

export interface ProjectState{
  isLoading: boolean;
  project: Project;
  error: string;
  currentPage: Routes;
  recommendedProjects: RecommendedProject[];
}

const newProject: Project = {
  category: '',
  description: '',
  goal: 0,
  imageUrl: '',
  name: '',
  region: '',
  content: '',
  team: { name: '', teamUsers: [] },
  projectTags: [],
  donatorsPrivileges: [],
  faqs: []
};

export const initialState: ProjectState = {
  isLoading: false,
  project: newProject,
  error: '',
  currentPage: Routes.HOME,
  recommendedProjects: [],
};

export const projectReduser = createReducer<ProjectState>(initialState, {
  [createProjectAction.TRIGGER](state) {
    return {
      ...state,
      isLoading: true
    };
  },
  [createProjectAction.SUCCESS](state, action: CreateProjectSuccessActionType) {
    return {
      ...state,
      isLoading: false,
      project: action.payload
    };
  },
  [createProjectAction.FAILURE](state, action: CreateProjectFailureActionType) {
    return {
      ...state,
      isLoading: false,
      error: action.payload
    };
  },
  [fetchRecommendedProjectsAction.SUCCESS](state, action: FetchRecommendedProjectsSuccessActionType) {
    return {
      ...state,
      isLoading: false,
      recommendedProjects: action.payload,
    };
  },
  [fetchRecommendedProjectsAction.FAILURE](state, action: FetchRecommendedProjectsFailureActionType) {
    return {
      ...state,
      isLoading: false,
      error: action.payload
    };
  },
  [getForEditProjectAction.TRIGGER](state) {
    return {
      ...state,
      isLoading: true
    };
  },
  [getForEditProjectAction.SUCCESS](state, action: GetForEditProjectSuccessActionType) {
    return {
      ...state,
      isLoading: false,
      project: action.payload
    };
  },
  [getForEditProjectAction.FAILURE](state, action: GetForEditProjectFailureActionType) {
    return {
      ...state,
      isLoading: false,
      error: action.payload
    };
  }
});

export default projectReduser;
