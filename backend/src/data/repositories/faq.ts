import { EntityRepository, Repository } from 'typeorm';
import { FAQ } from '../entities';

@EntityRepository(FAQ)
export class FAQRepository extends Repository<FAQ> {
  public getAll() {
    return this.find();
  }
}
