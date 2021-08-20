import { Privilege, PrivilegeWithBakersAmount } from './../../common/types/project';
const mapPrivileges = (
  privileges: Privilege[],
  bakersDonation: number[]
): PrivilegeWithBakersAmount[] => {
  if (privileges) {
    return privileges.map(privilege => {
      return {
        ...privilege,
        bakersAmount: bakersDonation ?
          bakersDonation.filter(x => x >= privilege.amount).length :
          0
      }
    })
  }
  return [];
}

export { mapPrivileges };

