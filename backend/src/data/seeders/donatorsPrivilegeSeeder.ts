import { asyncForEach } from 'hypecrafter-shared/helpers/arrayHelper';
import { DonatorsPrivilege } from '../entities/donatorsPrivilege';
import { donatorsPrivileges } from '../seed-data/donatorsPrivilegeData';

export default class DonatorsPrivilegeSeeder {
  public static async execute() {
    await asyncForEach(async donatorsPrivilege => {
      await Object.assign(new DonatorsPrivilege(), donatorsPrivilege).save();
    }, donatorsPrivileges);
  }
}
