import { asyncForEach } from 'hypecrafter-shared/helpers/arrayHelper';
import { getRepository } from 'typeorm';
import { Tag } from '../entities/tag';
import { UserProfile } from '../entities/userProfile';
import { tags } from '../seed-data-production/tagsData';

export default class TagsSeeder {
  public static async execute() {
    await asyncForEach(async tag => {
      const author = await getRepository(UserProfile).findOne({ id: tag.authorId });

      await Object.assign(new Tag(), {
        ...tag,
        author
      }).save();
    }, tags);
  }
}
