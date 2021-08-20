import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { AbstractEntity } from './abstract';
import { Chat } from './chat';
import { Project } from './project';
import { TeamUsers } from './teamUsers';

@Entity()
export class Team extends AbstractEntity {
  @Column({ type: 'text' })
  name: string;

  @OneToOne(() => Project, project => project.team)
  @JoinColumn()
  project: Project;

  @OneToMany(() => Chat, chat => chat.team)
  chats: Chat[];

  @OneToMany(() => TeamUsers, teamUsers => teamUsers.team)
  teamUsers: TeamUsers[];
}

