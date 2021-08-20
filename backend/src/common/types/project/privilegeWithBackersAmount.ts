import { Privilege } from ".";

export interface PrivilegeWithBakersAmount extends Privilege {
  bakersAmount: number;
}