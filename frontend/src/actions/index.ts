export { googleAuthAction, loginAction, registerUserAction } from '../scenes/Auth/actions';
export { createProjectAction } from '../scenes/CreateProject/actions';
export { fetchPopularAndRecommendedProjectsAction, fetchTopics } from '../scenes/MainPage/actions';
export { addComment, fetchProject, setReaction, setWatch } from '../scenes/ProjectPage/actions';
export {
  fetchProjectsAction,
  filterCategoryProjectsAction,
  filterProjectsAction,
  sortProjectsAction
} from '../scenes/Projects/actions';

export {
  fetchCategories,
  fetchPopularProjectsByCategory,
  fetchPopularTagsAction,
  setSelectedCategoryAction
} from '../scenes/TrendsPage/actions';
export { fetchUserProfileAction } from '../scenes/UserPage/actions';

export {
  authFetchUserAction,
  openModalAction,
  closeModalAction,
  setEditingAction,
  updateUserProfileAction
} from './auth';

export { setFundAction } from '../scenes/Wallet/Payment/actions';
export { clearTransactionsStateAction, fetchTransactionsPageAction } from '../scenes/Wallet/Transactions/actions';
export { getCategoriesAction } from './categories';
export { getUsersAction } from './users';

