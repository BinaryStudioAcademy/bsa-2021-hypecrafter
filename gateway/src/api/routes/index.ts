import { Router } from 'express';
import path from 'path';
import { Path } from '../../common/enums';
import { Services } from '../../services';
import authRouter from './auth';
import categoryRouter from './category';
import chatRouter from './chat';
import commentRouter from './comment';
import donateRouter from './donate';
import notificationRouter from './notification';
import paymentRouter from './payment';
import projectRouter from './project';
import tagRouter from './tag';
import topicRouter from './topic';
import userRouter from './user';

const initRoutes = (services: Services) => {
  const router = Router();

  router.use(Path.Topic, topicRouter());
  router.use(Path.User, userRouter());
  router.use(Path.Auth, authRouter(services));
  router.use(Path.Notification, notificationRouter());
  router.use(Path.Payment, paymentRouter());
  router.use(Path.Project, projectRouter());
  router.use(Path.Tag, tagRouter());
  router.use(Path.Category, categoryRouter());
  router.use(Path.Comment, commentRouter());
  router.use(Path.Donate, donateRouter());
  router.use(Path.Chat, chatRouter());
  router.use('*', (_req, res) => {
    res.status(404).sendFile(path.resolve('src/common/errorPages/404.html'));
  });

  return router;
};

export default initRoutes;
