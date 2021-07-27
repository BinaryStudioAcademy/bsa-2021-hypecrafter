import { Router, Response } from 'express';
import { Project } from 'hypecrafter-shared';

const init = () => {
  const router = Router();

  return router.get(['/', '/:id'], (_, res: Response) => res.delegate(Project.BACKEND));
};

export default init;
