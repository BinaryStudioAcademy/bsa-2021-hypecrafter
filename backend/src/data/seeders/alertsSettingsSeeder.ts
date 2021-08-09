import { asyncForEach } from 'hypecrafter-shared/helpers/arrayHelper';
import { getRepository } from 'typeorm';
import { AlertsSettings } from '../entities/alertsSettings';
import { UserProfile } from '../entities/userProfile';
import { alertsSettings } from '../seed-data/alertSettingsData';

export default class AlertsSettingsSeeder {
  public static async execute() {
    await asyncForEach(async alert => {
      const user = await getRepository(UserProfile).findOne({ id: alert.userId });

      await Object.assign(new AlertsSettings(), {
        ...alert,
        user
      }).save();
    }, alertsSettings);
  }
}
