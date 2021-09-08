import { EntityRepository, Repository } from 'typeorm';
import { DonatorsPrivilege } from '../entities';

@EntityRepository(DonatorsPrivilege)
export class DonatorsPrivilegeRepository extends Repository<DonatorsPrivilege> {
  public getAll() {
    return this.find();
  }
}
