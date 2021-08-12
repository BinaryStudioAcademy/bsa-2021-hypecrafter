import { getCustomRepository } from 'typeorm';
import { ProjectRepository, TopicRepository, UserRepository } from '../data/repositories';
import ProjectService from './project';
import TopicService from './topic';
import UserService from './user';

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
