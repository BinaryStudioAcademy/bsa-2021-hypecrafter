import { getCustomRepository } from 'typeorm';
import { CategoryRepository } from './category';
import { ChatRepository } from './chat';
import { CommentRepository } from './comment';
import { ProjectRepository } from './project';
import { ProjectTagRepository } from './projectTag';
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
  tagRepository: getCustomRepository(TagRepository),
  projectTagRepository: getCustomRepository(ProjectTagRepository)
  commentRepository: getCustomRepository(CommentRepository)
});

export type Repositories = {
  userRepository: UserRepository;
  topicRepository: TopicRepository;
  projectRepository: ProjectRepository;
  teamRepository: TeamRepository;
  chatRepository: ChatRepository;
  tagRepository: TagRepository;
  categoryRepository: CategoryRepository;
  projectTagRepository: ProjectTagRepository;
  commentRepository: CommentRepository;
};

export {
  ProjectRepository,
  TopicRepository,
  UserRepository,
  TeamRepository,
  ChatRepository,
  TagRepository,
  CategoryRepository,
  ProjectTagRepository
  CommentRepository
};
