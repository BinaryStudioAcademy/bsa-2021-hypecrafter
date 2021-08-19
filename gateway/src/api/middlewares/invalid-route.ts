import { Response } from 'express';
import path from 'path';

const invalidRoute = (res: Response) => {
  res.status(404).sendFile(path.resolve('src/common/errorPage/404.html'));
};

export default invalidRoute;
