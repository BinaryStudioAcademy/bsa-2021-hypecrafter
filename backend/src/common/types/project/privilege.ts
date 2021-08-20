export interface Privilege {
  amount: number,
  privilege: string;
}

export interface PrivilegeWithBakersAmount extends Privilege {
  bakersAmount: number;
}

