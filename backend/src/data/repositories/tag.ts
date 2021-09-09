import { EntityRepository, Repository } from 'typeorm';
import { Tag } from '../entities';

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  #tagLimit = 11;

  private getTagByOrder(order = '') {
    return this.createQueryBuilder('tag')
      .select(
        `
          tag."id", 
          tag."name", 
          COUNT(projectTags.projectId) AS "quantity"
        `
      )
      .leftJoin('tag.projectTags', 'projectTags')
      .groupBy('tag."id", tag."name"')
      .orderBy(order, 'DESC')
      .limit(this.#tagLimit)
      .execute();
  }

  public getById(id: string) {
    return this.createQueryBuilder('tag')
      .select('name')
      .where({ id })
      .getRawOne();
  }

  public getPopular() {
    return this.getTagByOrder('quantity');
  }

  public getAll() {
    return this.find();
  }
}
