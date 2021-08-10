import randtoken from 'rand-token';
import { RefreshToken } from '../../data/entities/refreshToken';
import { createToken } from '../../helpers/createToken';
import { RefreshTokenRepository } from '../../data/repositories/refreshToken';

export default class AuthService {
  readonly #refreshTokenRepository: RefreshTokenRepository;

  constructor(refreshTokenRepository: RefreshTokenRepository) {
    this.#refreshTokenRepository = refreshTokenRepository;
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
    throw new Error('Refresh token is invalid');
  }

  public async deleteRefreshToken(refreshToken: string) {
    const tokenItem: RefreshToken = await this.#refreshTokenRepository.getByToken(refreshToken);
    if (tokenItem) {
      await this.#refreshTokenRepository.deleteByToken(refreshToken);
    }
  }
}
