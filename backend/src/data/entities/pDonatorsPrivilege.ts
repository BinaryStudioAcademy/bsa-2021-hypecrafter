import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DonatorsPrivilege } from './donatorsPrivilege';
import { Project } from './project';

@Entity()
export class PDonatorsPrivilege extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => DonatorsPrivilege,
    donatorsPrivilege => donatorsPrivilege.pDonatorsPrivileges
  )
  public donatorsPrivilege!: DonatorsPrivilege;

  @ManyToOne(() => Project, project => project.donates)
  public project!: Project;
}
