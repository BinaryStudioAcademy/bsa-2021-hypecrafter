import { Request, Response } from 'express';
import MicroMq from 'micromq';
import { ActionPath, NotificationMessageTypes } from '../../common/enums';
import { Job, Notification } from '../../common/types';
import { wrap } from '../../helpers';
import { JobController } from '../../schedule/index';
import { Services } from '../../services';

const init = (
  { notificationService, jobService }: Services,
  jobController: JobController,
  path: string
) => (app: MicroMq) => app
  .get(
    `${path}`,
    wrap<Empty, any, { id: string }, Empty>((req) => {
      const { id } = req.query;
      return notificationService.getNotificationsByUser(id);
    })
  )
  .get(
    `${path}/:id`,
    wrap<Empty, any, { id: string }, Empty>((req) => notificationService.getById(req.params.id))
  )
  .put(
    `${path}/:id`,
    wrap<Empty, any, Notification, Empty>(async (req) => {
      await notificationService.updateNotification(req.params.id, req.body);
      return { ok: true };
    })
  )
  .post(
    `${path}/get-unread`, async (req: Request, res: Response) => {
      console.log(req.body);
      res.json({ ok: true });
    }
  )
  .post(ActionPath.CommentNotification, async (req: Request, res: Response) => {
    const data = await notificationService.createNotification({
      ...req.body.data,
      type: NotificationMessageTypes.COMMENT,
    } as Notification);

    res.json({
      server: {
        action: ActionPath.CommentNotification,
        meta: {
          data,
          comment: req.body.comment
        },
      },
    });
  })
  .post(ActionPath.LikeNotifications, async (req: Request, res: Response) => {
    const data = await notificationService.createNotification({
      ...req.body.data,
      type: NotificationMessageTypes.LIKE,
    } as Notification);

    res.json({
      server: {
        action: ActionPath.LikeNotifications,
        meta: {
          data,
          likesAndDislikes: req.body.likesAndDislikes
        },
      },
    });
  })
  .post(ActionPath.NewProject, async (req: Request, res: Response) => {
    const job = await jobService.createJob(req.body as Job);
    jobController.startJob(job);

    res.json({ ok: true });
  });

export default init;
