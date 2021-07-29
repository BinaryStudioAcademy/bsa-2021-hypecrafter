import { Entity, Column } from 'typeorm';
import { AbstractEntity } from './abstract';

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

  @Column()
  balance: string;

  // @Column()
  // passwordHash: string;

  // @Column()
  // passwordSalt: string;

  @Column()
  lastLoginDate: Date;

  @Column()
  description: string;

  @Column()
  region: string;
}
