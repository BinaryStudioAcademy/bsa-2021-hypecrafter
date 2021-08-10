import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract';
import { Team } from './team';
import { UserProfile } from './userProfile';
import { Message } from './message';

@Entity()
export class Chat extends AbstractEntity {
  @ManyToOne(() => Team, team => team.chats)
  team: Team;

  @OneToMany(() => Message, message => message.chat)
  messages: Message[];

  @ManyToOne(() => UserProfile, userProfile => userProfile.chats)
  donator: UserProfile;
}
