import { Entity, OneToOne, Column, JoinColumn } from 'typeorm';
import { ScheduleFrequency } from '../../common/enums';
import { AbstractEntity } from './abstract';
import { UserProfile } from './userProfile';

@Entity()
export class AlertsSettings extends AbstractEntity {
  @Column({ type: 'enum', enum: ScheduleFrequency, default: ScheduleFrequency.Daily })
  frequency: ScheduleFrequency;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  time: string;

  @OneToOne(() => UserProfile, userProfile => userProfile.alertsSettings)
  @JoinColumn()
  user: UserProfile;
}
