import { Project } from 'hypecrafter-shared/enums';
import MicroMq from 'micromq';
import { ActionType } from '../../common/enums';
import { Notification } from '../../common/types';
import { NotificationDataToMap } from '../../common/types/notification/notification';
import { NotificationRepository } from '../../data/repositories';
import { getDataToSend } from '../../helpers/notificationDataToSendForm';

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

  public async getNotificationsByUser(userId: string) {
    const notifications = await this.#notificationRepository.getNotificationsByUser(userId);

    const notificationsToSend = notifications.map(async (notification: any) => {
      const { userId: notificationUserId, projectId } = notification;
      const userName = await this.getUserNameById(notificationUserId);
      const projectName = await this.getProjectNameById(projectId);
      return getDataToSend({ ...notification, userName, projectName } as NotificationDataToMap);
    });

    return Promise.all(notificationsToSend);
  }

  public updateNotification(id: string, data: Notification) {
    return this.#notificationRepository.updateNotification(id, data);
  }

  private async getUserNameById(userId: string) {
    const { response: responseUserName } = await this.#app.ask(Project.BACKEND, {
      server: {
        action: ActionType.GET_USERNAME_BY_ID,
        meta: {
          userId
        },
      },
    }) as { response: { userName: string } };

    return responseUserName.userName;
  }

  private async getProjectNameById(projectId: string) {
    const { response: responseProjectName } = await this.#app.ask(Project.BACKEND, {
      server: {
        action: ActionType.GET_PROJECTNAME_BY_ID,
        meta: {
          projectId
        },
      },
    }) as { response: { projectName: string } };

    return responseProjectName.projectName;
  }

  public async createNotification(data: Notification) {
    const newNotification = await this.#notificationRepository.createNotification(data);
    const { userId, projectId } = newNotification;

    let userName = null;
    if (userId) {
      userName = await this.getUserNameById(userId);
    }
    const projectName = await this.getProjectNameById(projectId);

    return { ...newNotification, userName, projectName };
  }
}
