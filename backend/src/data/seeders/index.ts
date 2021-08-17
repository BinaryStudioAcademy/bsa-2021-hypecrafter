import { createConnection } from 'typeorm';
import { log } from '../../helpers/logger';
import AlertsSettingsSeeder from './alertsSettingsSeeder';
import CategorySeeder from './categorySeeder';
import CommentSeeder from './commentSeeder';
import DonateSeeder from './donateSeeder';
import DonatorsPrivilegeSeeder from './donatorsPrivilegeSeeder';
import FaqSeeder from './faqSeeder';
import ProjectDonatorsPrivilegesSeeder from './projectDonatorsPrivilegesSeeder';
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
    await DonatorsPrivilegeSeeder.execute();
    await UserProfileProjectSeeder.execute();
    await AlertsSettingsSeeder.execute();
    await DonateSeeder.execute();
    await FaqSeeder.execute();
    await ProjectDonatorsPrivilegesSeeder.execute();
    await CommentSeeder.execute();
  })
  .catch(log);
