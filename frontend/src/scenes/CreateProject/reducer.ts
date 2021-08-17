import { Routes } from '../../common/enums';
import { createReducer } from '../../helpers';
import type {
  CreateProjectFailureActionType,
  CreateProjectSuccessActionType
} from './actions';
import { createProjectAction } from './actions';
import { CreateProject } from './types/project';

export interface ProjectState{
  isLoading: boolean;
  project: CreateProject;
  error: string;
  currentPage: Routes;
}

const newProject: CreateProject = {
  id: '',
  category: '',
  description: '',
  donated: 0,
  goal: 0,
  imageUrl: '',
  name: '',
  tags: [],
  totalViews: 0,
  minutesToRead: 0,
  region: '',
  totalInteractionTime: 0,
  startDate: '',
  finishDate: '',
  content: ''
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
