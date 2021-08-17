import { getCustomRepository } from 'typeorm';
import { CategoryRepository } from './category';
import { ProjectRepository } from './project';
import { TopicRepository } from './topic';
import { UserRepository } from './user';

export const initRepositories = (): Repositories => ({
  userRepository: getCustomRepository(UserRepository),
  topicRepository: getCustomRepository(TopicRepository),
  projectRepository: getCustomRepository(ProjectRepository),
  categoryRepository: getCustomRepository(CategoryRepository)
});

export type Repositories = {
  userRepository: UserRepository;
  topicRepository: TopicRepository;
  projectRepository: ProjectRepository;
  categoryRepository:CategoryRepository;
};

export {
  ProjectRepository,
  TopicRepository,
  UserRepository,
  CategoryRepository
};
