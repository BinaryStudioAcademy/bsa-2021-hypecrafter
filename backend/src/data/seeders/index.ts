import { createConnection } from 'typeorm';
import { log } from '../../helpers/logger';
import UserProfileSeeder from './userProfileSeeder';
import CategorySeeder from './categorySeeder';
import TagsSeeder from './tagsSeeder';
import ProjectSeeder from './projectSeeder';
import ProjectTagsSeeder from './projectTagsSeeder';
import UserProfileProjectSeeder from './userProfileProjectSeeder';
import AlertsSettingsSeeder from './alertsSettingsSeeder';

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
