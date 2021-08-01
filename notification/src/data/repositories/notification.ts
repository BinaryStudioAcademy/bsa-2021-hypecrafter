import { Repository, EntityRepository } from 'typeorm';
import { Notification } from '../entities/notification';

@EntityRepository(Notification)
export class NotificationRepository extends Repository<Notification> {
  // TODO ...
  // Just example

  #users = [
    {
      id: '4f34285a-245e-49a1-b1ce-42a1439a3420',
      title: 'New investor',
      body: 'Hello. Mark Zuckenberg wants to invest in your project.'
    },
    {
      id: '77549748-b9b8-41a4-8af3-ae7e615e2d07',
      title: 'New project',
      body: 'Hi. Maybe you want to invest in a very cool project "Hypecrafter".'
    },
    {
      id: 'db64e5d7-fea7-4d08-b9d8-297c7f503faa',
      title: 'New investor',
      body: 'Hello. Jeff Bezos wants to invest in your project.'
    },
    {
      id: '4e06a44f-0586-41a4-a125-29082512e1a6',
      title: 'New investor',
      body: 'Hello. Tony Stark wants to invest in your project.'
    }
  ];

  public getAll() {
    // TODO...
    // return this.find();

    return Promise.resolve(this.#users);
  }

  public getById(id: string) {
    // TODO...
    // return this.findOne({ id });

    return Promise.resolve(this.#users.find((it) => it.id === id));
  }
}
