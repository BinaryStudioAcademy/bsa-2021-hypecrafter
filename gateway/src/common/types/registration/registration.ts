export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterData {
  email: string;
  passwordHash: string;
  facebookId?: string;
  googleId?: string;
}
