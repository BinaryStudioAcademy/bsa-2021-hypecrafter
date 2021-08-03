import { Entity, OneToOne, JoinColumn, OneToMany, Column } from 'typeorm';
import { AbstractEntity } from './abstract';
import { Project } from './project';
import { Chat } from './chat';

@Entity()
export class Team extends AbstractEntity {
  @Column({ type: 'text' })
  name: string;

  @OneToOne(() => Project)
  @JoinColumn()
  project: Project;

  @OneToMany(() => Chat, chat => chat.team)
  public chats!: Chat[];
}
