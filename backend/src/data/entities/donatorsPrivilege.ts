import { Entity, Column, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract';
import { ProjectDonatorsPrivilege } from './projectDonatorsPrivilege';

@Entity()
export class DonatorsPrivilege extends AbstractEntity {
  @Column({ type: 'text' })
  privilege: string;

  @Column({ type: 'money' })
  amount: number;

  @OneToMany(
    () => ProjectDonatorsPrivilege,
    projectDonatorsPrivilege => projectDonatorsPrivilege.donatorsPrivilege
  )
  projectDonatorsPrivileges!: ProjectDonatorsPrivilege[];
}
