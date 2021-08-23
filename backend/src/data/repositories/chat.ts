import { EntityRepository, Repository } from 'typeorm';
import { Chat } from '../entities/chat';

@EntityRepository(Chat)
export class ChatRepository extends Repository<Chat> {}
