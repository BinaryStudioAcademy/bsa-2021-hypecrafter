import { getCustomRepository } from 'typeorm';
import { CategoryRepository } from './category';
import { ProjectRepository } from './project';
import { TagRepository } from './tag';
import { TopicRepository } from './topic';
import { UserRepository } from './user';

export const initRepositories = (): Repositories => ({
  userRepository: getCustomRepository(UserRepository),
  topicRepository: getCustomRepository(TopicRepository),
  projectRepository: getCustomRepository(ProjectRepository),
  tagRepository: getCustomRepository(TagRepository),
  categoryRepository: getCustomRepository(CategoryRepository)
});

export type Repositories = {
  userRepository: UserRepository;
  topicRepository: TopicRepository;
  projectRepository: ProjectRepository;
  tagRepository: TagRepository;
  categoryRepository: CategoryRepository;
};

export {
  ProjectRepository,
  TopicRepository,
  UserRepository,
  TagRepository,
  CategoryRepository
};
