import MicroMq from 'micromq';
import { Services } from '../services';

export const initActions = (app: MicroMq, services: Services) => {
  app.action('getWatchingUsers', async (meta, res) => {
    const { projectId } = meta as { projectId: string };
    const users = await services.projectService.getUsersWatchingProject(projectId);
    res.json({ users });
  });
};
