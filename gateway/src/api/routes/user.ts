import { Response, Router } from 'express';
import { Project } from 'hypecrafter-shared/enums';

const init = () => {
  const router = Router();

  router.get(['/', '/:id'], (_, res: Response) => res.delegate(Project.BACKEND));
  router.post('/webhook', (_, res: Response) => res.delegate(Project.BACKEND));
  return router;
};

export default init;
