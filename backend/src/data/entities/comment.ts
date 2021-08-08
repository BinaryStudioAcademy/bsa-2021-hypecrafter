import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract';
import { Message } from './message';
import { Project } from './project';
import { UserProfile } from './userProfile';

@Entity()
export class Comment extends AbstractEntity {
  @Column({ type: 'text' })
  message: string;

  @ManyToOne(() => Project, project => project.comments)
  project: Project;

  @ManyToOne(() => UserProfile, userProfile => userProfile.comments)
  author: UserProfile;

  @OneToMany(() => Comment, childComment => childComment.parentComment)
  childComments: Comment[];

  @ManyToOne(() => Comment, parentComment => parentComment.childComments)
  parentComment: Message;
}
