import MicroMq from 'micromq';
import { NotificationMessageTypes } from '../common/enums';
import { Notification } from '../common/types';
import { Services } from '../services';

export const initActions = (app: MicroMq, services: Services) => {
  app.action(NotificationMessageTypes.COMMENT, async (meta, res) => {
    services.notificationService.createNotification({
      ...meta,
      type: NotificationMessageTypes.COMMENT
    } as Notification);

    res.json({ ok: true });
  });

  app.action(NotificationMessageTypes.LIKE, async (meta, res) => {
    services.notificationService.createNotification({ ...meta, type: NotificationMessageTypes.LIKE } as Notification);

    res.json({ ok: true });
  });
};
