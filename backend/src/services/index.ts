import { getCustomRepository } from 'typeorm';
import { UserRepository, TopicRepository } from '../data/repositories';
import UserService from './user';
import TopicService from './topic';

export function initServices() {
  return {
    userService: new UserService(getCustomRepository(UserRepository)),
    topicService: new TopicService(getCustomRepository(TopicRepository))
  };
}

export interface Services {
  userService: UserService,
  topicService: TopicService
}
