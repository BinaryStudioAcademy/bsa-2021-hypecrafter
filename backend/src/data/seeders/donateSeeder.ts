import { asyncForEach } from 'hypecrafter-shared/helpers/arrayHelper';
import { getRepository } from 'typeorm';
import { Donate } from '../entities';
import { Project } from '../entities/project';
import { UserProfile } from '../entities/userProfile';
import { donates } from '../seed-data/donatesData';

export default class DonateSeeder {
  public static async execute() {
    await asyncForEach(async donate => {
      const project = await getRepository(Project).findOne({ id: donate.projectId });
      const user = await getRepository(UserProfile).findOne({ id: donate.userId });
      await Object.assign(new Donate(), { ...donate, project, user }).save();
    }, donates);
  }
}
