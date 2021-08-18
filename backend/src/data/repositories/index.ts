import { getCustomRepository } from 'typeorm';
import { CategoryRepository } from './category';
import { ProjectRepository } from './project';
import { TagRepository } from './tag';
import { TopicRepository } from './topic';
import { UserRepository } from './user';
import { TeamRepository } from './team';
import { ChatRepository } from './chat';

export const initRepositories = (): Repositories => ({
  userRepository: getCustomRepository(UserRepository),
  topicRepository: getCustomRepository(TopicRepository),
  projectRepository: getCustomRepository(ProjectRepository),
<<<<<<< HEAD
  categoryRepository: getCustomRepository(CategoryRepository),
  teamRepository: getCustomRepository(TeamRepository),
  chatRepository: getCustomRepository(ChatRepository)
=======
  tagRepository: getCustomRepository(TagRepository),
  categoryRepository: getCustomRepository(CategoryRepository)
>>>>>>> develop
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
  ChatRepository
  TagRepository,
  CategoryRepository
};
