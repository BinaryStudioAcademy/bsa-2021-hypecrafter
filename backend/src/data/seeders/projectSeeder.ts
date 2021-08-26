import { asyncForEach } from 'hypecrafter-shared/helpers/arrayHelper';
import { getRepository } from 'typeorm';
import { Team } from '../entities';
import { Category } from '../entities/category';
import { Project } from '../entities/project';
import { UserProfile } from '../entities/userProfile';
import { projects } from '../seed-data/projectsData';

export default class ProjectSeeder {
  public static async execute() {
    await asyncForEach(async project => {
      const category = await getRepository(Category).findOne({ id: project.categoryId });
      const author = await getRepository(UserProfile).findOne({ id: project.authorId });
      const team = await getRepository(Team).findOne({ id: project.teamId });

      await Object.assign(new Project(), {
        ...project,
        author,
        category,
        team
      }).save();
    }, projects);
  }
}
