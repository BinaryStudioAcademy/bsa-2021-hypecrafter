import MicroMq from 'micromq';
import { Repositories } from '../data/repositories';
import CategoryService from './category';
import CommentService from './comment';
import ProjectService from './project';
import ProjectTagService from './projectTag';
import TagService from './tag';
import TopicService from './topic';
import UserService from './user';

export function initServices(repositories: Repositories, app: MicroMq): Services {
  return {
    userService: new UserService(repositories.userRepository),
    topicService: new TopicService(repositories.topicRepository),
    projectService: new ProjectService(repositories.projectRepository,
      repositories.teamRepository, repositories.chatRepository,
      repositories.userRepository,
      new TagService(repositories.tagRepository),
      new ProjectTagService(repositories.projectTagRepository), app),
    tagService: new TagService(repositories.tagRepository),
    categoryService: new CategoryService(repositories.categoryRepository),
    commentService: new CommentService(repositories.commentRepository, repositories.projectRepository, app),
  };
}

export type Services = {
  userService: UserService,
  topicService: TopicService,
  projectService: ProjectService,
  tagService: TagService,
  categoryService: CategoryService,
  commentService: CommentService
};
