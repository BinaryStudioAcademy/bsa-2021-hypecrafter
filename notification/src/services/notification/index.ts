import { notificationRepository } from '../../data/repositories';
import NotificationService from './notification';

const userService = new NotificationService(
  notificationRepository
);

export default userService;
