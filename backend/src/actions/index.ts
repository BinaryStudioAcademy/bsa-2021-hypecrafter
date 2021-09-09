import MicroMq from 'micromq';
import { ActionType } from '../common/enums';
import { Services } from '../services';

export const initActions = (app: MicroMq, services: Services) => {
  app.action(ActionType.GET_WATCHING_USERS, async (meta, res) => {
    const { projectId } = meta as { projectId: string };
    const users = await services.projectService.getUsersWatchingProject(projectId);
    res.json({ users });
  });

  app.action(ActionType.GET_USERNAME_BY_ID, async (meta, res) => {
    const { userId } = meta as { userId: string };
    const user = await services.userService.getById(userId);
    const userName = `${user?.firstName} ${user?.lastName}`;
    res.json({ userName });
  });

  app.action(ActionType.GET_PROJECTNAME_BY_ID, async (meta, res) => {
    const { projectId } = meta as { projectId: string };
    const project = await services.projectService.getById(projectId);
    const projectName = project.name;
    res.json({ projectName });
  });
};
