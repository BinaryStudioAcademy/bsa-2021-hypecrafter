import { Response, Router } from 'express';
import { Project } from 'hypecrafter-shared/enums';

const init = () => {
  const router = Router();

  return router
    .get(['/', '/:id'], (_, res: Response) => res.delegate(Project.BACKEND))
    .put(['/:id'], (_, res: Response) => res.delegate(Project.BACKEND))
    .post('/webhook', (_, res: Response) => res.delegate(Project.BACKEND));
};

export default init;
