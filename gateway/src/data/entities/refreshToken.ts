import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { User } from './user';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  token: string;

  @Column()
  userAgentInfo: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, user => user.refreshTokens)
  user: User;
}
