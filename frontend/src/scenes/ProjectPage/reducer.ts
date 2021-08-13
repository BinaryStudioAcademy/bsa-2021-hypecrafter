import { Project } from '../../common/types';
import { createReducer } from '../../helpers';
import type { FetchProjectSuccessActionType } from './actions';
import { fetchProject } from './actions';

export interface ProjectPageState {
  isLoading: boolean;
  project: Project;
}

export const projectPageState: ProjectPageState = {
  isLoading: false,
  project: {} as Project
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
  }
});

export default projectPageReducer;
