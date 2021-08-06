/* eslint-disable import/no-extraneous-dependencies */
import { createConnection } from 'typeorm';
import { log } from '../../helpers/logger';
import projectData from './projectData';

createConnection()
  .then(async () => {
    await projectData();
  })
  .catch(e => log(e));
