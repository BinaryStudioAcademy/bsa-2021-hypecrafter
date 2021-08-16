import { getCategoriesAction } from '../actions';
import type {
  GetCategoriesFailureActionType,
  GetCategoriesSuccessActionType
} from '../actions/categories';
import { Categories } from '../common/types';
import { createReducer } from '../helpers';

export interface CategoriesState{
  isLoading: boolean;
  categories: Categories[];
  error: string;
}

export const initialState: CategoriesState = {
  isLoading: false,
  categories: [],
  error: '',
};

export const categoriesReduser = createReducer<CategoriesState>(initialState, {
  [getCategoriesAction.TRIGGER](state) {
    return {
      ...state,
      isLoading: true
    };
  },
  [getCategoriesAction.SUCCESS](state, action: GetCategoriesSuccessActionType) {
    return {
      ...state,
      isLoading: false,
      categories: action.payload
    };
  },
  [getCategoriesAction.FAILURE](state, action: GetCategoriesFailureActionType) {
    return {
      ...state,
      isLoading: false,
      error: action.payload
    };
  }
});
export default categoriesReduser;
