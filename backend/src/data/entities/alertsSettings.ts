import { Entity, OneToOne, JoinColumn, Column } from 'typeorm';
import { AbstractEntity } from './abstract';
import { UserProfile } from './userProfile';

@Entity()
export class AlertsSettings extends AbstractEntity {
  @Column({ type: 'int' })
  frequency: number;

  @Column({ type: 'text' })
  unit: string;

  @OneToOne(() => UserProfile)
  @JoinColumn()
  user: UserProfile;
}
