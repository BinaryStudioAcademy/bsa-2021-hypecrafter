import { getCustomRepository } from 'typeorm';
import {
  CategoryRepository,
  ProjectRepository,
  TagRepository,
  TopicRepository,
  UserRepository
} from '../data/repositories';
import CategoryService from './category';
import ProjectService from './project';
import TagService from './tag';
import TopicService from './topic';
import UserService from './user';

export function initServices() {
  return {
    userService: new UserService(getCustomRepository(UserRepository)),
    topicService: new TopicService(getCustomRepository(TopicRepository)),
    projectService: new ProjectService(getCustomRepository(ProjectRepository)),
    tagService: new TagService(getCustomRepository(TagRepository)),
    categoryService: new CategoryService(getCustomRepository(CategoryRepository))
  };
}

export interface Services {
  userService: UserService;
  topicService: TopicService;
  projectService: ProjectService;
  tagService: TagService;
  categoryService: CategoryService;
}
