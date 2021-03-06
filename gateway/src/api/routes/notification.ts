import { Response, Router } from 'express';
import { Project } from 'hypecrafter-shared/enums';

const init = () => {
  const router = Router();

  return router.get(['/', '/:id', '/get-unread'], (_, res: Response) => res.delegate(Project.NOTIFICATION))
    .put(['/:id'], (_, res: Response) => res.delegate(Project.NOTIFICATION))
    .post(['/project-time-out'], (_, res: Response) => {
      res.delegate(Project.NOTIFICATION);
    });
};

export default init;
