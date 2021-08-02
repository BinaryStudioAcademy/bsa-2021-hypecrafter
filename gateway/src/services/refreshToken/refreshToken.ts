import { RefreshTokenRepository } from '../../data/repositories/refreshToken';

export default class RefreshTokenService {
  readonly #refreshTokenRepository: RefreshTokenRepository;

  constructor(refreshTokenRepository: RefreshTokenRepository) {
    this.#refreshTokenRepository = refreshTokenRepository;
  }

  public getByToken(token: string) {
    return this.#refreshTokenRepository.getByToken(token);
  }
}
