import { EntityRepository, Repository } from 'typeorm';
import { Message } from '../entities';

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {
  public getAll() {
    return this.find();
  }
}
