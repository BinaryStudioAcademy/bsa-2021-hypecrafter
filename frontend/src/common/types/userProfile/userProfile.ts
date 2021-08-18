export interface UserProfile {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  description?: string;
  region?: string;
  balance: string;
  rating: number;
  instagramUrl?: string;
  facebookUrl?: string;
  dribbleUrl?: string;
  lastLoginDate: string;
  createdAt: string;
  updatedAt?: string | null;
  deletedAt?: string | null;
}
