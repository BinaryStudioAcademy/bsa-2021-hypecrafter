import { asyncForEach } from 'hypecrafter-shared/helpers/arrayHelper';
import { Notification } from '../entities/notification';
import { notificationData } from '../seed-data/notificationsData';

export default class NotificationSeeder {
  public static async execute() {
    await asyncForEach(async history => {
      await Object.assign(new Notification(), history).save();
    }, notificationData);
  }
}
