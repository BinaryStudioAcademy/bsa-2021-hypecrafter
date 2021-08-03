import {
  Entity,
  ManyToOne,
  OneToMany,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn
} from 'typeorm';
import { Team } from './team';
import { UserProfile } from './userProfile';
import { Message } from './message';

@Entity()
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Team, team => team.chats)
  public team!: Team;

  @OneToMany(() => Message, message => message.chat)
  public messages!: Message[];

  @ManyToOne(() => UserProfile, userProfile => userProfile.chats)
  public donator!: UserProfile[];
}
