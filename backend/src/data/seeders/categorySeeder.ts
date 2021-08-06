import { asyncForEach } from 'hypecrafter-shared/helpers/arrayHelper';
import { Category } from '../entities/category';
import { categories } from '../seed-data/categoryData';

export default class CategorySeeder {
  public static async execute() {
    await asyncForEach(async category => {
      await Object.assign(new Category(), category).save();
    }, categories);
  }
}
