import { Router } from 'express';
import { Project } from 'hypecrafter-shared';

const init = () => {
  const router = Router();

  return router.get(['/', '/:id'], (_, res) => res.delegate(Project.BACKEND));
};

export default init;
