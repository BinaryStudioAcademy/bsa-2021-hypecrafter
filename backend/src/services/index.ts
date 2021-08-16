import { getCustomRepository } from 'typeorm';
import { ProjectRepository, TopicRepository, UserRepository, CategoryRepository } from '../data/repositories';
import ProjectService from './project';
import TopicService from './topic';
import UserService from './user';
import CategoryService from './category';

export function initServices() {
  return {
    userService: new UserService(getCustomRepository(UserRepository)),
    topicService: new TopicService(getCustomRepository(TopicRepository)),
    projectService: new ProjectService(getCustomRepository(ProjectRepository)),
    categoryService: new CategoryService(getCustomRepository(CategoryRepository))
  };
}

export interface Services {
  userService: UserService,
  topicService: TopicService,
  projectService: ProjectService,
  categoryService:CategoryService
}
