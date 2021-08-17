import { Repositories } from '../data/repositories';
import ProjectService from './project';
import TopicService from './topic';
import UserService from './user';
import CategoryService from './category';

export function initServices(repositories: Repositories): Services {
  return {
    userService: new UserService(repositories.userRepository),
    topicService: new TopicService(repositories.topicRepository),
    projectService: new ProjectService(repositories.projectRepository),
    categoryService: new CategoryService(repositories.categoryRepository)
  };
}

export type Services = {
  userService: UserService,
  topicService: TopicService,
  projectService: ProjectService,
  categoryService: CategoryService
};
