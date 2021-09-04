import { Routes } from '../../common/enums';
import { CreateProject as Project } from '../../common/types';
import { createReducer } from '../../helpers';
import type {
  CreateProjectFailureActionType,
  CreateProjectSuccessActionType,
  GetForEditProjectFailureActionType,
  GetForEditProjectSuccessActionType
} from './actions';
import { createProjectAction, getForEditProjectAction } from './actions';

export interface ProjectState{
  isLoading: boolean;
  project: Project;
  error: string;
  currentPage: Routes;
}

const newProject: Project = {
  category: '',
  description: '',
  goal: 0,
  imageUrl: '',
  name: '',
  region: '',
  content: '',
  team: { name: '', chats: [] },
  projectTags: [],
  donatorsPrivileges: [],
  faqs: []
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
