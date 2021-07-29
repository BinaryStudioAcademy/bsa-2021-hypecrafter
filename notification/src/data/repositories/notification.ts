export class NotificationRepository {
  #notifications = [
    {
      id: 1,
      userId: 2,
      title: 'New investor',
      body: 'Hello. Mark Zuckenberg wants to invest in your project.'
    },
    {
      id: 2,
      userId: 3,
      title: 'New project',
      body: 'Hi. Maybe you want to invest in a very cool project "Hypecrafter".'
    },
    {
      id: 3,
      userId: 4,
      title: 'New investor',
      body: 'Hello. Jeff Bezos wants to invest in your project.'
    },
    {
      id: 4,
      userId: 2,
      title: 'New investor',
      body: 'Hello. Tony Stark wants to invest in your project.'
    }
  ];

  public getAll() {
    return Promise.resolve(this.#notifications);
  }

  public getById(id: string) {
    return Promise.resolve(this.#notifications.find((it) => it.id === Number(id)));
  }
}

export const notificationRepository = new NotificationRepository();
