/* eslint-disable import/no-extraneous-dependencies */
import { Repository, EntityRepository } from 'typeorm';
import { Project } from '../entities';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  public addProject(project: Project): Promise<Project> {
    return this.create(project).save();
  }
}
