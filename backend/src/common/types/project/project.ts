import { Privilege, PrivilegeWithBakersAmount } from '.';

export interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  goal: number;
  donated: number;
  bakersAmount: number;
  imageUrl: string;
  privileges: Privilege[] | PrivilegeWithBakersAmount[];
  bakersDonation: number[];
  involvementIndex: number
}
