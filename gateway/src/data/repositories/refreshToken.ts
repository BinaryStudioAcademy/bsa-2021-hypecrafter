import { Repository, EntityRepository } from 'typeorm';
import { RefreshToken } from '../entities/refreshToken';

@EntityRepository(RefreshToken)
export class RefreshTokenRepository extends Repository<RefreshToken> {
  getByToken(token: string) {
    return this.findOne({ token });
  }
}
