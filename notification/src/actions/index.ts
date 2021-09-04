import MicroMq from 'micromq';
import * as cron from 'node-cron';
import { NotificationMessageTypes } from '../common/enums';
import { Job, Notification } from '../common/types';
import { dataToScheduleForm } from '../helpers/dataToScheduleForm';
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

  app.action('new_project', async (meta, res) => {
    services.jobService.createJob(meta as Job);
    const { finishDate, projectId } = meta as Job;
    const finishDateToScheduleForm = dataToScheduleForm(new Date(finishDate));

    cron.schedule(
      finishDateToScheduleForm,
      async () => {
        // const projectId = 'a9ea4107-10de-44f0-93da-3c24c1932e56';
        const { response } = (await app.ask('backend', {
          server: {
            action: 'getWatchingUsers',
            meta: {
              projectId
            },
          },
        })) as { response: { users: string } };

        services.jobService.deleteByProjectId(projectId);
        console.log(response.users);
      },
      { scheduled: true }
    );

    res.json({ ok: true });
  });
};
