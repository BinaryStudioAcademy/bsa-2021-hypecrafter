import { getCustomRepository } from 'typeorm';
import { UserRepository, TopicRepository, ProjectRepository } from '../data/repositories';
import UserService from './user';
import TopicService from './topic';
import ProjectService from './project';

export function initServices() {
  return {
    userService: new UserService(getCustomRepository(UserRepository)),
    topicService: new TopicService(getCustomRepository(TopicRepository)),
    projectService: new ProjectService(getCustomRepository(ProjectRepository))
  };
}

export interface Services {
  userService: UserService,
  topicService: TopicService,
  projectService: ProjectService
}
