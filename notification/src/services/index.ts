import { getCustomRepository } from 'typeorm';
import { JobRepository } from '../data/repositories';
import { NotificationRepository } from '../data/repositories/notification';
import JobService from './job';
import NotificationService from './notification';

export function initServices() {
  return {
    notificationService: new NotificationService(getCustomRepository(NotificationRepository)),
    jobService: new JobService(getCustomRepository(JobRepository))
  };
}

export interface Services {
  notificationService: NotificationService;
  jobService: JobService;
}
