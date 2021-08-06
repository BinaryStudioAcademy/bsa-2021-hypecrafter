/* eslint-disable import/no-extraneous-dependencies */
import { Entity, Column, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract';
import { UserProject } from './userProject';

@Entity()
export class UserProfile extends AbstractEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column({ type: 'numeric' })
  balance: number;

  @Column()
  lastLoginDate: Date;

  @Column()
  description: string;

  @Column()
  region: string;

  @OneToMany(() => UserProject, userProject => userProject.user)
  userProjects: UserProject[];
}
