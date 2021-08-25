import { ProjectPage } from '../../common/types';
import { createReducer } from '../../helpers';
import type {
  AddCommentSuccessActionType,
  FetchProjectSuccessActionType
} from './actions';
import { addComment, fetchProject } from './actions';

export interface ProjectPageState {
  isLoading: boolean;
  project: ProjectPage;
  isInputLoading: boolean;
}

export const projectPageState: ProjectPageState = {
  isLoading: false,
  project: {} as ProjectPage,
  isInputLoading: false
};

const projectPageReducer = createReducer<ProjectPageState>(projectPageState, {
  [fetchProject.TRIGGER](state) {
    return {
      ...state,
      isLoading: true
    };
  },
  [fetchProject.SUCCESS](state, action: FetchProjectSuccessActionType) {
    return {
      ...state,
      isLoading: false,
      project: action.payload
    };
  },
  [fetchProject.FAILURE](state) {
    return {
      ...state,
      isLoading: false
    };
  },
  [addComment.TRIGGER](state) {
    return {
      ...state,
      isInputLoading: true
    };
  },
  [addComment.SUCCESS](state, action: AddCommentSuccessActionType) {
    return {
      ...state,
      isInputLoading: false,
      project: {
        ...state.project,
        projectComments: [...state.project.projectComments, action.payload]
      }
    };
  },
  [addComment.FAILURE](state) {
    return {
      ...state,
      isInputLoading: false,
    };
  }
});

export default projectPageReducer;
