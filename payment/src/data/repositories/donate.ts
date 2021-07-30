import { Repository, EntityRepository } from 'typeorm';
import { Donate } from '../entities/donate';

@EntityRepository(Donate)
export class DonateRepository extends Repository<Donate> {
  public getAll() {
    return this.find();
  }

  public getById(id: string) {
    return this.findOne({ id });
  }
}
