/* eslint-disable import/no-extraneous-dependencies */
import { Repository, EntityRepository } from 'typeorm';
import { Project } from '../entities';
import { IProject } from '../../common/interfaces';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  public addProject(project: IProject): Promise<Project> {
    return this.create(project).save();
  }
}
