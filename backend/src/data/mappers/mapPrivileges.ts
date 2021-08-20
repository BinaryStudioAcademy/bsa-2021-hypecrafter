const mapPrivileges = (
  privileges: { amount: number, privilege: string }[], bakersDonation: number[]
) => privileges.map(privilege => {
  return {
    ...privilege,
    bakersAmount: bakersDonation.filter(x => x >= privilege.amount).length
  }
})

export { mapPrivileges };

