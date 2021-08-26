import { Response, Router } from 'express';
import { Project } from 'hypecrafter-shared/enums';

const init = () => {
  const router = Router();

  router.get('/:page', (_, res: Response) => res.delegate(Project.PAYMENT));
  router.post('/create-payment-intent', (_, res: Response) => res.delegate(Project.PAYMENT));
  router.post('/webhook', (_, res: Response) => res.delegate(Project.PAYMENT));
  return router;
};

export default init;
