import { Entity, Column, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract';
import { Donate } from './donate';

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

  @OneToMany(() => Donate, donate => donate.userProfile)
  public donates!: Donate[];
}
