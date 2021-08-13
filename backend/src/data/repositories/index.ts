import { getCustomRepository } from 'typeorm';
import { ProjectRepository, TopicRepository } from '.';
import { UserRepository } from './user';

export const initRepositories = () : Repositories => ({
  userRepository: getCustomRepository(UserRepository),
  topicRepository: getCustomRepository(TopicRepository),
  projectRepository: getCustomRepository(ProjectRepository)
});

export type Repositories = { userRepository: UserRepository, topicRepository: TopicRepository, projectRepository: ProjectRepository };

export * from './project';
export * from './topic';
export * from './user';

