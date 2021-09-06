import { Privilege, PrivilegeWithBakersAmount } from '../../common/types/project';

const mapPrivileges = (
  privileges: Privilege[],
  bakersDonation: number[] | null
): PrivilegeWithBakersAmount[] => {
  if (privileges) {
    return privileges.map(privilege => ({
      ...privilege,
      bakersAmount: bakersDonation
        ? bakersDonation.filter(x => x >= privilege.amount).length
        : 0
    }));
  }
  return [];
};

export { mapPrivileges };

