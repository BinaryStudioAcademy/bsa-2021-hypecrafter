import { EntityRepository, Repository } from 'typeorm';
import { DonateData } from '../../common/types/donate';
import { Donate } from '../entities';

@EntityRepository(Donate)
export class DonateRepository extends Repository<Donate> {
  async createDonate(data: DonateData) {
    const newDonate = Object.assign(new Donate(), data);
    return this.save(newDonate);
  }
}
