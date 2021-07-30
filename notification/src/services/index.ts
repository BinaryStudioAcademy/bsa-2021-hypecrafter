import { getCustomRepository } from 'typeorm';
import { NotificationRepository } from '../data/repositories/notification';
import NotificationService from './notification';

export function initServices() {
  return {
    notificationService: new NotificationService(getCustomRepository(NotificationRepository))
  };
}

export interface Services {
  notificationService: NotificationService;
}
