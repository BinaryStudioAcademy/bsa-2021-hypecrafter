import { Routes } from '../../common/enums';
import { Project } from '../../common/types';
import { createReducer } from '../../helpers';
import type {
  CreateProjectFailureActionType,
  CreateProjectSuccessActionType
} from './actions';
import { createProjectAction } from './actions';

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
  goal: 0,
  imageUrl: '',
  name: '',
  tags: [],
  donated: 0,
  totalViews: 0,
  minutesToRead: 0,
  region: '',
  totalInteractionTime: 0,
  startDate: new Date(),
  finishDate: new Date()
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
