import { Response } from 'express';
import path from 'path';

const invalidRoute = (res: Response) => {
  res.status(404).sendFile(path.resolve('src/common/errorPages/404.html'));
};

export default invalidRoute;
