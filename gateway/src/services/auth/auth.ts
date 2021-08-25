import randtoken from 'rand-token';
import { HttpStatusCode } from '../../../../shared/build/enums';
import { RefreshToken } from '../../data/entities/refreshToken';
import { RefreshTokenRepository } from '../../data/repositories/refreshToken';
import { UserRepository } from '../../data/repositories/user';
import { encrypt } from '../../helpers/crypt';
import { CustomError } from '../../helpers/customError';
import { createToken } from '../../helpers/tokens';

export default class AuthService {
  readonly #refreshTokenRepository: RefreshTokenRepository;

  readonly #userRepository: UserRepository;

  constructor(refreshTokenRepository: RefreshTokenRepository, userRepository: UserRepository) {
    this.#refreshTokenRepository = refreshTokenRepository;
    this.#userRepository = userRepository;
  }

  public loginUser(
    userId: string,
    userAgentInfo: string
  ): { accessToken: string; refreshToken: string } {
    const accessToken: string = createToken(userId);
    const refreshToken: string = randtoken.uid(256);
    this.#refreshTokenRepository.createToken({
      token: refreshToken,
      userAgentInfo,
      userId
    });

    return { accessToken, refreshToken };
  }

  public async createAccessToken(
    userId: string,
    refreshToken: string
  ): Promise<{ accessToken: string }> {
    const userToken: RefreshToken = await this.#refreshTokenRepository.getByToken(refreshToken);
    if (userToken && userToken.token === refreshToken) {
      const accessToken: string = createToken(userId);
      return { accessToken };
    }
    throw new CustomError(HttpStatusCode.UNAUTHORIZED, 'Refresh token is invalid');
  }

  public async deleteRefreshToken(refreshToken: string) {
    const tokenItem: RefreshToken = await this.#refreshTokenRepository.getByToken(refreshToken);
    if (tokenItem) {
      await this.#refreshTokenRepository.deleteByToken(refreshToken);
    }
  }

  public async registerUser(
    email: string,
    password: string
  ) {
    const passwordHash: string = await encrypt(password);
    const newUser = await this.#userRepository.createUser({
      email,
      passwordHash
    });
    return newUser;
  }

  public async registerUserWithGoogle(
    email: string,
    googleId: string
  ) {
    if (await this.#userRepository.getByEmail(email)) {
      throw new CustomError(HttpStatusCode.BAD_REQUEST, 'Email is already taken');
    }
    const passwordHash: string = await encrypt(googleId);
    const newUser = await this.#userRepository.createUser({
      email,
      passwordHash,
      googleId
    });
    return newUser;
  }

  public getUserByGoogleId(googleId: string) {
    return this.#userRepository.getByGoogleId(googleId);
  }
}
