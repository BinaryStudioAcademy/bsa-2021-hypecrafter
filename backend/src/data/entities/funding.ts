import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { AbstractEntity } from './abstract';
import { Project } from './project';
import { UserProfile } from './userProfile';

@Entity()
export class Funding extends AbstractEntity {
  @Column({ type: 'text' })
  name: string;

  @OneToOne(() => Project, project => project.funding)
  @JoinColumn()
  project: Project;

  @OneToMany(() => UserProfile, userProfile => userProfile.funding)
  sponsors: UserProfile[];
}

