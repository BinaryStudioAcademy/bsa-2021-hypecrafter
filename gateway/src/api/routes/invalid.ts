import { Response, Router } from 'express';

const init = () => {
  const router = Router();

  return router.get('', (_, res: Response) =>
    res.sendFile('../common/errorPages/404.html', { root: __dirname })
  );
};

export default init;
