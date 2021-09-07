import { Project } from 'hypecrafter-shared/enums';
import MicroMq from 'micromq';
import { ActionType } from '../../common/enums';
import { Notification } from '../../common/types';
import { NotificationRepository } from '../../data/repositories';

export default class NotificationService {
  readonly #notificationRepository: NotificationRepository;

  readonly #app: MicroMq;

  constructor(app: MicroMq, notificationRepository: NotificationRepository) {
    this.#notificationRepository = notificationRepository;
    this.#app = app;
  }

  public getAll() {
    return this.#notificationRepository.getAll();
  }

  public getById(id: string) {
    return this.#notificationRepository.getById(id);
  }

  public async createNotification(data: Notification) {
    const newNotification = await this.#notificationRepository.createNotification(data);
    const { userId, projectId } = newNotification;

    const { response: responseUserName } = await this.#app.ask(Project.BACKEND, {
      server: {
        action: ActionType.GET_USERNAME_BY_ID,
        meta: {
          userId
        },
      },
    }) as { response: { userName: string } };

    const { userName } = responseUserName;

    const { response: responseProjectName } = await this.#app.ask(Project.BACKEND, {
      server: {
        action: ActionType.GET_PROJECTNAME_BY_ID,
        meta: {
          projectId
        },
      },
    }) as { response: { projectName: string } };

    const { projectName } = responseProjectName;

    return { ...newNotification, userName, projectName };
  }
}
