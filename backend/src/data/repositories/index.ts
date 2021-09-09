import { getCustomRepository } from 'typeorm';
import { CategoryRepository } from './category';
import { ChatRepository } from './chat';
import { CommentRepository } from './comment';
import { DonatorsPrivilegeRepository } from './donatorsPrivilege';
import { FAQRepository } from './faq';
import { ProjectRepository } from './project';
import { ProjectTagRepository } from './projectTag';
import { TagRepository } from './tag';
import { TeamRepository } from './team';
import { TeamUserRepository } from './teamUser';
import { TopicRepository } from './topic';
import { UserRepository } from './user';

export const initRepositories = (): Repositories => ({
  userRepository: getCustomRepository(UserRepository),
  topicRepository: getCustomRepository(TopicRepository),
  projectRepository: getCustomRepository(ProjectRepository),
  categoryRepository: getCustomRepository(CategoryRepository),
  teamRepository: getCustomRepository(TeamRepository),
  chatRepository: getCustomRepository(ChatRepository),
  teamUserRepository: getCustomRepository(TeamUserRepository),
  tagRepository: getCustomRepository(TagRepository),
  projectTagRepository: getCustomRepository(ProjectTagRepository),
  commentRepository: getCustomRepository(CommentRepository),
  donatorsPrivilegeRepository: getCustomRepository(DonatorsPrivilegeRepository),
  faqRepository: getCustomRepository(FAQRepository)
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
  donatorsPrivilegeRepository: DonatorsPrivilegeRepository;
  faqRepository: FAQRepository;
  teamUserRepository: TeamUserRepository;
};

export {
  ProjectRepository,
  TopicRepository,
  UserRepository,
  TeamRepository,
  TeamUserRepository,
  ChatRepository,
  TagRepository,
  CategoryRepository,
  ProjectTagRepository,
  CommentRepository,
  DonatorsPrivilegeRepository,
  FAQRepository
};
