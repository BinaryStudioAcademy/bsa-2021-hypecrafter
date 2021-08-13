import { createConnection } from 'typeorm';
import { log } from '../../helpers/logger';
import AlertsSettingsSeeder from './alertsSettingsSeeder';
import CategorySeeder from './categorySeeder';
import ProjectSeeder from './projectSeeder';
import ProjectTagsSeeder from './projectTagsSeeder';
import TagsSeeder from './tagsSeeder';
import UserProfileProjectSeeder from './userProfileProjectSeeder';
import UserProfileSeeder from './userProfileSeeder';

createConnection()
  .then(async () => {
    await UserProfileSeeder.execute();
    await CategorySeeder.execute();
    await ProjectSeeder.execute();
    await TagsSeeder.execute();
    await ProjectTagsSeeder.execute();
    await UserProfileProjectSeeder.execute();
    await AlertsSettingsSeeder.execute();
  })
  .catch(log);
