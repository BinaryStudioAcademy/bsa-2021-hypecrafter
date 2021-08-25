import { CategoryType } from 'hypecrafter-shared/enums';
import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract';
import { Project } from './project';

@Entity()
export class Category extends AbstractEntity {
  @Column({
    type: 'enum',
    enum: CategoryType
  })
  name: CategoryType;

  @OneToMany(() => Project, project => project.category)
  projects: Project[];
}
