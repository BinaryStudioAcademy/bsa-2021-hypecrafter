import { Project } from '../../common/types';
import { createReducer } from '../../helpers';
import { createProjectAction } from './actions';
import type {
  CreateProjectSuccessActionType,
  CreateProjectFailureActionType
} from './actions';
import { Routes } from '../../common/enums';

export interface ProjectState{
  isLoading: boolean;
  project: Project;
  error: string;
  currentPage: Routes;
}

const newProject: Project = {
  id: '',
  category: '',
  description: '',
  donated: 0,
  goal: 0,
  imageUrl: '',
  name: '',
  tags: [],
  url: ''
};

export const initialState: ProjectState = {
  isLoading: false,
  project: newProject,
  error: '',
  currentPage: Routes.HOME
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
  }
});

export default projectReduser;