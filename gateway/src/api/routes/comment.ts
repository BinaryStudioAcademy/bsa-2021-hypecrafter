import { Response, Router } from 'express';
import { Project } from 'hypecrafter-shared/enums';

const init = () => {
  const router = Router();

  return router.post(['/'], (_, res: Response) => res.delegate(Project.BACKEND));
};

export default init;
