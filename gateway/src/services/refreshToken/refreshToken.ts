import { RefreshTokenRepository } from '../../data/repositories/refreshToken';

export default class RefreshTokenService {
  readonly #refreshTokenRepository: RefreshTokenRepository;

  constructor(refreshTokenRepository: RefreshTokenRepository) {
    this.#refreshTokenRepository = refreshTokenRepository;
  }

  public getByToken(token: string) {
    return this.#refreshTokenRepository.getByToken(token);
  }

  public getByUserId(userId: string) {
    return this.#refreshTokenRepository.getByUserId(userId);
  }

  public create(data: {token: string, userAgentInfo: string, userId: string}) {
    return this.#refreshTokenRepository.createToken(data);
  }

  public deleteByToken(token: string) {
    return this.#refreshTokenRepository.deleteByToken(token);
  }
}
