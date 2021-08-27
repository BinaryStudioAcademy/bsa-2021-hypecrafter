import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract';
import { RefreshToken } from './refreshToken';

@Entity()
export class User extends AbstractEntity {
  @Column()
  passwordHash: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  googleId: string;

  @OneToMany(() => RefreshToken, refreshToken => refreshToken.user)
  refreshTokens: RefreshToken[];
}
