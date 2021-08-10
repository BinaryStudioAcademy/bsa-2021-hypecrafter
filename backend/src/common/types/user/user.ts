export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  balance: number;
  // passwordHash: string;
  // passwordSalt: string;
  lastLoginDate: Date;
  description: string;
  region: string;
}
