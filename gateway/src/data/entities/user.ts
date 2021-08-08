import { OneToMany, Entity, Column } from 'typeorm';
import { AbstractEntity } from './abstract';
import { RefreshToken } from './refreshToken';

@Entity()
export class User extends AbstractEntity {
  @Column()
  passwordHash: string;

  @Column()
  email: string;

  @OneToMany(() => RefreshToken, refreshToken => refreshToken.user)
  refreshTokens: RefreshToken[];
}
