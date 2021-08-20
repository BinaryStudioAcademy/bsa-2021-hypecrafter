export interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  goal: number;
  donated: number;
  bakersAmount: number;
  privileges: { amount: number, privilege: string }[];
  bakersDonation: number[];
}
