import { createConnection } from 'typeorm';
import { log } from '../../helpers/logger';
import AlertsSettingsSeeder from './alertsSettingsSeeder';
import CategorySeeder from './categorySeeder';
import CommentSeeder from './commentSeeder';
import DonateSeeder from './donateSeeder';
import DonatorsPrivilegeSeeder from './donatorsPrivilegeSeeder';
import FaqSeeder from './faqSeeder';
import ProjectSeeder from './projectSeeder';
import ProjectTagsSeeder from './projectTagsSeeder';
import TagsSeeder from './tagsSeeder';
import TeamSeeder from './teamSeeder';
import TeamUsersSeeder from './teamUsersSeeder';
import UserProfileProjectSeeder from './userProfileProjectSeeder';
import UserProfileSeeder from './userProfileSeeder';

createConnection()
  .then(async () => {
    await UserProfileSeeder.execute();
    await CategorySeeder.execute();
    await TeamSeeder.execute();
    await ProjectSeeder.execute();
    await TagsSeeder.execute();
    await ProjectTagsSeeder.execute();
    await DonatorsPrivilegeSeeder.execute();
    await UserProfileProjectSeeder.execute();
    await AlertsSettingsSeeder.execute();
    await DonateSeeder.execute();
    await FaqSeeder.execute();
    await CommentSeeder.execute();
    await TeamUsersSeeder.execute();
  })
  .catch(log);
