import { NotificationRepository } from '../../data/repositories';

export default class NotificationService {
  readonly #notificationRepository: NotificationRepository;

  constructor(notificationRepository: NotificationRepository) {
    this.#notificationRepository = notificationRepository;
  }

  public getAll() {
    return this.#notificationRepository.getAll();
  }

  public getById(id: string) {
    return this.#notificationRepository.getById(id);
  }
}
