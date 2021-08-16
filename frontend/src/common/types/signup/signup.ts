export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface SignupData extends Record<string, string> {
  region: string;
  phoneNumber: string;
  gender: string;
  birthday: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
