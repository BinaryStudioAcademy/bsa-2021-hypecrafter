import { asyncForEach } from 'hypecrafter-shared/helpers/arrayHelper';
import { getRepository } from 'typeorm';
import { ProjectDonatorsPrivilege } from '../entities';
import { DonatorsPrivilege } from '../entities/donatorsPrivilege';
import { Project } from '../entities/project';
import { projectDonatorsPrivileges } from '../seed-data/projectDonatorsPrivilegesData';

export default class ProjectDonatorsPrivilegesSeeder {
  public static async execute() {
    await asyncForEach(async projectDonatorsPrivilege => {
      const project = await getRepository(Project).findOne({ id: projectDonatorsPrivilege.projectId });
      const donatorsPrivilege = await getRepository(DonatorsPrivilege)
        .findOne({ id: projectDonatorsPrivilege.donatorsPrivilegeId });

      await Object.assign(new ProjectDonatorsPrivilege(), {
        ...projectDonatorsPrivilege,
        project,
        donatorsPrivilege
      }).save();
    }, projectDonatorsPrivileges);
  }
}
