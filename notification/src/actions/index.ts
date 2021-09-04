import MicroMq from 'micromq';
import { NotificationMessageTypes } from '../common/enums';
import { Job, Notification } from '../common/types';
import { JobController } from '../schedule';
import { Services } from '../services';

export const initActions = (app: MicroMq, services: Services, jobController: JobController) => {
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

  app.action('new_project', async (meta, res) => {
    const job = await services.jobService.createJob(meta as Job);
    jobController.startJob(job);

    res.json({ ok: true });
  });
};
