import { Entity, ManyToOne, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from './project';
import { Tag } from './tag';

@Entity()
export class ProjectTag extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tag, tag => tag.projectTags)
  public tag!: Tag;

  @ManyToOne(() => Project, project => project.projectTags)
  public project!: Project;
}
