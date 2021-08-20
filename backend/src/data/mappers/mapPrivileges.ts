const mapPrivileges = (
  privileges: { amount: number, privilege: string }[],
  bakersDonation: number[]
): { amount: number, privilege: string, bakersAmount: number }[] => {
  if (privileges) {
    privileges.map(privilege => {
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

