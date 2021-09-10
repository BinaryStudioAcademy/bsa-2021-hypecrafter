import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract';
import { Chat } from './chat';
import { UserProfile } from './userProfile';

@Entity()
export class Message extends AbstractEntity {
  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'uuid' })
  chatId: string;

  @Column({ type: 'uuid' })
  authorId: string;

  @ManyToOne(() => Chat, chat => chat.messages)
  chat: Chat;

  @ManyToOne(() => UserProfile, userProfile => userProfile.messages)
  author: UserProfile;
}
