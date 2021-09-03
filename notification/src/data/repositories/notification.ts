import { EntityRepository, Repository } from 'typeorm';
import { Notification as NotificationData } from '../../common/types';
import { Notification } from '../entities/notification';

@EntityRepository(Notification)
export class NotificationRepository extends Repository<Notification> {
  public getAll() {
    return this.find();
  }

  public getById(id: string) {
    return this.findOne({ id });
  }

  public createNotification(data: NotificationData) {
    const newNotification: Notification = Object.assign(new Notification(), data);
    return this.save(newNotification);
  }
}
