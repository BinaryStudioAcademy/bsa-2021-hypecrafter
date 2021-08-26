import { getCustomRepository } from 'typeorm';
import { CategoryRepository } from './category';
import { ChatRepository } from './chat';
import { ProjectRepository } from './project';
import { TagRepository } from './tag';
import { TeamRepository } from './team';
import { TopicRepository } from './topic';
import { UserRepository } from './user';

export const initRepositories = (): Repositories => ({
  userRepository: getCustomRepository(UserRepository),
  topicRepository: getCustomRepository(TopicRepository),
  projectRepository: getCustomRepository(ProjectRepository),
  categoryRepository: getCustomRepository(CategoryRepository),
  teamRepository: getCustomRepository(TeamRepository),
  chatRepository: getCustomRepository(ChatRepository),
  tagRepository: getCustomRepository(TagRepository)
});

export type Repositories = {
  userRepository: UserRepository;
  topicRepository: TopicRepository;
  projectRepository: ProjectRepository;
  teamRepository: TeamRepository;
  chatRepository: ChatRepository;
  tagRepository: TagRepository;
  categoryRepository: CategoryRepository;
};

export {
  ProjectRepository,
  TopicRepository,
  UserRepository,
  TeamRepository,
  ChatRepository,
  TagRepository,
  CategoryRepository
};
