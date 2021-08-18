import { Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm';
import { AbstractEntity } from './abstract';
import { ProjectTag } from './projectTag';
import { UserProfile } from './userProfile';

@Unique(['name'])
@Entity()
export class Tag extends AbstractEntity {
  @Column({ type: 'text' })
  name: string;

  @OneToMany(() => ProjectTag, projectTag => projectTag.tag)
  projectTags: ProjectTag[];

  @ManyToOne(() => UserProfile, userProfile => userProfile.tags)
  author: UserProfile;
}
