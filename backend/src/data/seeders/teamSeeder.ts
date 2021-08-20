import { asyncForEach } from 'hypecrafter-shared/helpers/arrayHelper';
import { Team } from '../entities';
import { teams } from '../seed-data/teamData';

export default class TeamSeeder {
  public static async execute() {
    await asyncForEach(async team => {
      await Object.assign(new Team(), team).save();
    }, teams);
  }
}
