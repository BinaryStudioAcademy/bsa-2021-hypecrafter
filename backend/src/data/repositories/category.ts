import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../entities/category';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  public getAll() {
    return this.find();
  }
}
