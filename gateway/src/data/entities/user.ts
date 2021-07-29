import { OneToMany, Entity } from 'typeorm';
import { AbstractEntity } from './abstract';
import { RefreshToken } from './refreshToken';

@Entity()
export class User extends AbstractEntity {
  @OneToMany(() => RefreshToken, refreshToken => refreshToken.user)
  refreshTokens: RefreshToken[];
}
