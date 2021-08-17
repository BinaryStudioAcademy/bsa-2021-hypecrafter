export interface RegisterData {
  region: string;
  phoneNumber: string;
  gender: string;
  birthday: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterReqBody {
  data: RegisterData;
  tokens: Tokens;
}
