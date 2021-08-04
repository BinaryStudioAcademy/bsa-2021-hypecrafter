import { Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract';
import { DonatorsPrivilege } from './donatorsPrivilege';
import { Project } from './project';

@Entity()
export class ProjectDonatorsPrivilege extends AbstractEntity {
  @ManyToOne(
    () => DonatorsPrivilege,
    donatorsPrivilege => donatorsPrivilege.projectDonatorsPrivileges
  )
  donatorsPrivilege!: DonatorsPrivilege;

  @ManyToOne(() => Project, project => project.donates)
  project!: Project;
}
