/* eslint-disable import/no-extraneous-dependencies */
import { Repository, EntityRepository } from 'typeorm';
import { UserProject } from '../entities';
import { IUserProject } from '../../common/interfaces';

@EntityRepository(UserProject)
export class UserProjectRepository extends Repository<UserProject> {
  public addUserProject(userProject: IUserProject): Promise<UserProject> {
    return this.create(userProject).save();
  }
}
