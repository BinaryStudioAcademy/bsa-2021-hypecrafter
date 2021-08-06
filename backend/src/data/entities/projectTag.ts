import { Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract';
import { Project } from './project';
import { Tag } from './tag';

@Entity()
export class ProjectTag extends AbstractEntity {
  @ManyToOne(() => Tag, tag => tag.projectTags)
  tag: Tag;

  @ManyToOne(() => Project, project => project.projectTags)
  project: Project;
}
