import MicroMq from 'micromq';
import { ActionType } from '../common/enums';
import { Services } from '../services';

export const initActions = (app: MicroMq, services: Services) => {
  app.action(ActionType.GET_WATCHING_USERS, async (meta, res) => {
    const { projectId } = meta as { projectId: string };
    const users = await services.projectService.getUsersWatchingProject(projectId);
    res.json({ users });
  });
};
