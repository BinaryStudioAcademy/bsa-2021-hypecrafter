import { getCustomRepository } from 'typeorm';
import { CategoryRepository } from './category';
import { ProjectRepository } from './project';
import { TopicRepository } from './topic';
import { UserRepository } from './user';
import { TeamRepository } from './team';
import { ChatRepository } from './chat';

export const initRepositories = (): Repositories => ({
  userRepository: getCustomRepository(UserRepository),
  topicRepository: getCustomRepository(TopicRepository),
  projectRepository: getCustomRepository(ProjectRepository),
  categoryRepository: getCustomRepository(CategoryRepository),
  teamRepository: getCustomRepository(TeamRepository),
  chatRepository: getCustomRepository(ChatRepository)
});

export type Repositories = {
  userRepository: UserRepository;
  topicRepository: TopicRepository;
  projectRepository: ProjectRepository;
  categoryRepository: CategoryRepository;
  teamRepository: TeamRepository;
  chatRepository: ChatRepository;
};

export {
  ProjectRepository,
  TopicRepository,
  UserRepository,
  CategoryRepository,
  TeamRepository,
  ChatRepository
};
