import {
  Entity,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { AbstractEntity } from './abstract';
import { Chat } from './chat';
import { UserProfile } from './userProfile';
import { Comment } from './comment';

@Entity()
export class Message extends AbstractEntity {
  @Column({ type: 'text' })
  text: string;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  public chat!: Chat;

  @OneToOne(() => UserProfile)
  @JoinColumn()
  author: UserProfile;

  @OneToMany(() => Comment, comment => comment.messageLink)
  public comments!: Comment[];
}
