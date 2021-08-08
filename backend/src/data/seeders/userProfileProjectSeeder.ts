import { asyncForEach } from 'hypecrafter-shared/helpers/arrayHelper';
import { getRepository } from 'typeorm';
import { Project } from '../entities/project';
import { UserProfile } from '../entities/userProfile';
import { UserProject } from '../entities/userProject';
import { userProfileProjects } from '../seed-data/userProfileProjectData';

export default class UserProfileProjectSeeder {
  public static async execute() {
    await asyncForEach(async userProfileProject => {
      const project = await getRepository(Project).findOne({ id: userProfileProject.projectId });
      const user = await getRepository(UserProfile).findOne({ id: userProfileProject.userId });

      await Object.assign(new UserProject(), {
        ...userProfileProject,
        project,
        user
      }).save();
    }, userProfileProjects);
  }
}
