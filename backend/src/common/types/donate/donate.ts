import { Project, UserProfile } from '../../../data/entities';

export interface DonateData {
  amount: number,
  user: UserProfile;
  project: Project;
}

