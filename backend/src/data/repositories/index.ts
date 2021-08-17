import { getCustomRepository } from 'typeorm';
import { ProjectRepository } from './project';
import { TopicRepository } from './topic';
import { UserRepository } from './user';

export const initRepositories = (): Repositories => ({
  userRepository: getCustomRepository(UserRepository),
  topicRepository: getCustomRepository(TopicRepository),
  projectRepository: getCustomRepository(ProjectRepository),
});

export type Repositories = {
  userRepository: UserRepository;
  topicRepository: TopicRepository;
  projectRepository: ProjectRepository;
};

export {
  ProjectRepository,
  TopicRepository,
  UserRepository
};
