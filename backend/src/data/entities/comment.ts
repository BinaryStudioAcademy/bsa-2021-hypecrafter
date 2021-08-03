import {
  Entity,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { AbstractEntity } from './abstract';
import { Message } from './message';
import { UserProfile } from './userProfile';

@Entity()
export class Comment extends AbstractEntity {
  @Column({ type: 'text' })
  message: string;

  @ManyToOne(() => Message, message => message.comments)
  public messageLink!: Message;

  @OneToOne(() => UserProfile)
  @JoinColumn()
  author: UserProfile;

  @OneToMany(() => Comment, childComment => childComment.parentComment)
  public childComments!: Comment[];

  @ManyToOne(() => Comment, parentComment => parentComment.childComments)
  public parentComment!: Message;
}
