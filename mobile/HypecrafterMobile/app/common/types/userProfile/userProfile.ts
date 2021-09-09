export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  description?: string;
  region?: string;
  balance: number;
  rating: number;
  instagramUrl?: string;
  facebookUrl?: string;
  dribbleUrl?: string;
  pinterestUrl?: string;
  behanceUrl?: string;
  lastLoginDate: string;
  createdAt: string;
  updatedAt?: string | null;
  deletedAt?: string | null;
  name: string,
  username: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: number,
      lng: number
    }
  };
  phone: string;
  website: string;
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  };
  imageUrl: string;
}