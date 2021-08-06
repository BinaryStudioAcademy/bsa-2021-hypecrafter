import { Entity, Column, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract';
import { ProjectTag } from './projectTag';

@Entity()
export class Tag extends AbstractEntity {
  @Column({ type: 'text' })
  name: string;

  @OneToMany(() => ProjectTag, projectTag => projectTag.tag)
  projectTags: ProjectTag[];
}
