import { Action } from 'redux';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Category, Tag } from '../../common/types';
import { getCategories } from '../../services/categories';
import { getPopularProjectsByCategory } from '../../services/projects';
import { getPopularTags } from '../../services/tags';
import {
  fetchCategories,
  fetchPopularProjectsByCategory,
  fetchPopularTagsAction,
  setSelectedCategoryAction
} from './actions';
import { ProjectItem } from './interfaces';

interface TrendsPageAction extends Action {
  payload: string;
}

function* fetchPopularTagsRequest() {
  try {
    const response: Tag[] = yield call(getPopularTags);
    yield put(fetchPopularTagsAction.success(response));
  } catch (error) {
    yield put(fetchPopularTagsAction.failure(error as string));
  }
}

function* watchFetchPopularTagsRequest() {
  yield takeEvery(fetchPopularTagsAction.TRIGGER, fetchPopularTagsRequest);
}

function* fetchCategoriesRequest() {
  try {
    const response: Category[] = yield call(getCategories);
    yield put(fetchCategories.success(response));
    const selectedCategory = response[0];
    if (selectedCategory) {
      yield put(setSelectedCategoryAction(selectedCategory));
      const res: ProjectItem[] = yield call(
        getPopularProjectsByCategory,
        selectedCategory.name
      );
      yield put(fetchPopularProjectsByCategory.success(res));
    }
  } catch (error) {
    yield put(fetchCategories.failure(error as string));
  }
}

function* watchFetchCategoriesRequest() {
  yield takeEvery(fetchCategories.TRIGGER, fetchCategoriesRequest);
}

function* fetchPopularProjectsByCategoryRequest(action: TrendsPageAction) {
  try {
    const response: ProjectItem[] = yield call(
      getPopularProjectsByCategory,
      action.payload
    );
    yield put(fetchPopularProjectsByCategory.success(response));
  } catch (error) {
    yield put(fetchPopularProjectsByCategory.failure(error as string));
  }
}

function* watchFetchPopularProjectsByCategoryRequest() {
  yield takeEvery(
    fetchPopularProjectsByCategory.TRIGGER,
    fetchPopularProjectsByCategoryRequest
  );
}

export default function* trendsPageSaga() {
  yield all([
    watchFetchPopularTagsRequest(),
    watchFetchCategoriesRequest(),
    watchFetchPopularProjectsByCategoryRequest()
  ]);
}
