import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { createConnection } from 'typeorm';
import { initMiddlewares } from './api/middlewares';
import { initPassport } from './api/passport';
import initRoutes from './api/routes';
import { initRepositories } from './data/repositories';
import { env } from './env';
import { log } from './helpers';
import { initServices } from './services';
import { SocketController } from './services/socketController';

const { port, environment } = env.app;
const app = express();

app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ limit: '15mb' }));
createConnection().then(() => {
  try {
    const server = createServer();
    const socketController = new SocketController(server);
    server.listen(3009);

    const repositories = initRepositories();
    const services = initServices(repositories);
    initPassport(app, repositories);
    initMiddlewares(app, services, socketController);
    app.use(initRoutes(services));

    app.listen(port, () => {
      log(`Server is running at port: ${port}. Environment: "${environment}"`);
    });
  } catch (e) {
    log('App started with error', e);
  }
}, err => log('Connection to database was failed.', err));
