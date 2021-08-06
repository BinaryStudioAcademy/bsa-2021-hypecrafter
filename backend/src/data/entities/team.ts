import { Entity, OneToOne, OneToMany, Column, JoinColumn } from 'typeorm';
import { AbstractEntity } from './abstract';
import { Project } from './project';
import { Chat } from './chat';

@Entity()
export class Team extends AbstractEntity {
  @Column({ type: 'text' })
  name: string;

  @OneToOne(() => Project, project => project.team)
  @JoinColumn()
  project: Project;

  @OneToMany(() => Chat, chat => chat.team)
  chats: Chat[];
}
