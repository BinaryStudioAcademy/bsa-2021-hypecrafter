import { Router } from 'express';

const init = () => {
  const router = Router();

  return router.get(['/', '/:id', '/error'], (_, res) => res.delegate('backend'));
};

export default init;
