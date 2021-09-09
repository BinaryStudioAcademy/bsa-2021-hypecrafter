import { getTagsAction } from '../actions';
import type {
  GetTagsFailureActionType,
  GetTagsSuccessActionType
} from '../actions/tags';
import { Tag } from '../common/types';
import { createReducer } from '../helpers';

export interface TagsState{
  isLoading: boolean;
  tags: Tag[];
  error: string;
}

export const initialState: TagsState = {
  isLoading: false,
  tags: [],
  error: '',
};

export const tagsReduser = createReducer<TagsState>(initialState, {
  [getTagsAction.TRIGGER](state) {
    return {
      ...state,
      isLoading: true
    };
  },
  [getTagsAction.SUCCESS](state, action: GetTagsSuccessActionType) {
    return {
      ...state,
      isLoading: false,
      tags: action.payload
    };
  },
  [getTagsAction.FAILURE](state, action: GetTagsFailureActionType) {
    return {
      ...state,
      isLoading: false,
      error: action.payload
    };
  }
});
export default tagsReduser;
