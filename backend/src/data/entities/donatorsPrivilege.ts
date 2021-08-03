import { Entity, Column, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract';
import { PDonatorsPrivilege } from './pDonatorsPrivilege';

@Entity()
export class DonatorsPrivilege extends AbstractEntity {
  @Column({ type: 'text' })
  privilege: string;

  @Column({ type: 'money' })
  amount: number;

  @OneToMany(
    () => PDonatorsPrivilege,
    pDonatorsPrivilege => pDonatorsPrivilege.donatorsPrivilege
  )
  public pDonatorsPrivileges!: PDonatorsPrivilege[];
}
