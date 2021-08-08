import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract';
import { Chat } from './chat';
import { UserProfile } from './userProfile';

@Entity()
export class Message extends AbstractEntity {
  @Column({ type: 'text' })
  text: string;

  @ManyToOne(() => Chat, chat => chat.messages)
  chat: Chat;

  @ManyToOne(() => UserProfile, userProfile => userProfile.messages)
  author: UserProfile;
}
