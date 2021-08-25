import { asyncForEach } from 'hypecrafter-shared/helpers/arrayHelper';
import { getRepository } from 'typeorm';
import { Team, TeamUsers, UserProfile } from '../entities';
import { teamUsers } from '../seed-data/teamUsersData';

export default class TeamUsersSeeder {
  public static async execute() {
    await asyncForEach(async teamUser => {
      const user = await getRepository(UserProfile).findOne({ id: teamUser.userId });
      const team = await getRepository(Team).findOne({ id: teamUser.teamId });

      await Object.assign(new TeamUsers(), {
        ...teamUser,
        user,
        team
      }).save();
    }, teamUsers);
  }
}
