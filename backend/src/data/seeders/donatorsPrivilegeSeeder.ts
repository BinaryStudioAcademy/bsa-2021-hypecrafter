import { asyncForEach } from 'hypecrafter-shared/helpers/arrayHelper';
import { getRepository } from 'typeorm';
import { Project } from '../entities';
import { DonatorsPrivilege } from '../entities/donatorsPrivilege';
import { donatorsPrivileges } from '../seed-data/donatorsPrivilegeData';

export default class DonatorsPrivilegeSeeder {
  public static async execute() {
    await asyncForEach(async donatorsPrivilege => {
      const project = await getRepository(Project).findOne({ id: donatorsPrivilege.projectId });

      await Object.assign(new DonatorsPrivilege(), { ...donatorsPrivilege, project }).save();
    }, donatorsPrivileges);
  }
}
