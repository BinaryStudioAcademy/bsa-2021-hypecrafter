import { Repositories } from '../data/repositories';
import CategoryService from './category';
import ProjectService from './project';
import TagService from './tag';
import TopicService from './topic';
import UserService from './user';

export function initServices(repositories: Repositories): Services {
  return {
    userService: new UserService(repositories.userRepository),
    topicService: new TopicService(repositories.topicRepository),
    projectService: new ProjectService(repositories.projectRepository,
      repositories.teamRepository, repositories.chatRepository,
      repositories.projectTagRepository, repositories.tagRepository),
    tagService: new TagService(repositories.tagRepository),
    categoryService: new CategoryService(repositories.categoryRepository),
  };
}

export type Services = {
  userService: UserService,
  topicService: TopicService,
  projectService: ProjectService,
  tagService: TagService,
  categoryService: CategoryService
};
