// eslint-disable-next-line import/no-extraneous-dependencies
import { Repository, EntityRepository } from 'typeorm';
import { Category } from '../entities/category';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  public getAll() {
    return this.find();
  }
}
