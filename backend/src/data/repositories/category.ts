import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../entities';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  #categoryLimit = 7;

  public getById(id: string) {
    return this.createQueryBuilder('category')
      .select('name')
      .where({ id })
      .getRawOne();
  }

  public getAll() {
    return this.createQueryBuilder('category')
      .select('*')
      .limit(this.#categoryLimit)
      .execute();
  }
}
