import { Response, Router } from 'express';
import { Project } from 'hypecrafter-shared/enums';

const init = () => {
  const router = Router();
  return router
    .get(['/', '/:id', '/getForEdit/:id'], (_, res: Response) => res.delegate(Project.BACKEND))
    .post(['/', '/reaction', '/watch'], (_, res: Response) => res.delegate(Project.BACKEND))
    .put('/views-interaction/:id', (_, res: Response) => res.delegate(Project.BACKEND))
    .get(['/', '/recommendation', '/:id', '/:id/statistics', '/getForEdit/:id'],
      (_, res: Response) => res.delegate(Project.BACKEND))
    .post(['/', '/reaction', '/watch'], (_, res: Response) => res.delegate(Project.BACKEND));
};

export default init;
