import { Repository, EntityRepository } from "typeorm";
import { RefreshToken } from "./../entities/refreshToken";

@EntityRepository(RefreshToken)
export class RefreshTokenRepository extends Repository<RefreshToken> {
  getByToken(token: string) {
    return this.findOne({ token });
  }
  getByUserId(userId: string) {
    return this.findOne({ userId });
  }
  createToken(data: { token: string; userAgentInfo: string; userId: string }) {
    const newToken: RefreshToken = Object.assign(new RefreshToken(), data);
    return this.save(newToken);
  }
  deleteByToken(token: string) {
    return this.findOne({ token }).then((refreshToken) =>
      this.remove(refreshToken)
    );
  }
}
