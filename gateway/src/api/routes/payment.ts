import { Response, Router } from 'express';
import { Project } from 'hypecrafter-shared/enums';

const init = () => {
  const router = Router();

  return router.get('/:id/:page', (_, res: Response) => res.delegate(Project.PAYMENT));
};

export default init;
