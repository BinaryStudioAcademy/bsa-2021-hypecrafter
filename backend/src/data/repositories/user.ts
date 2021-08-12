import { Repository, EntityRepository } from "typeorm";
import { UserProfile } from "../entities/userProfile";

@EntityRepository(UserProfile)
export class UserRepository extends Repository<UserProfile> {
  public getAll() {
    return this.find();
  }

  public getById(id: string) {
    return this.findOne({ id });
  }

  public createUser(data: {
    region: string;
    phoneNumber: string;
    gender: string;
    birthday: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }) {
    const newUserProfile: UserProfile = Object.assign(new UserProfile(), {
      ...data,
      lastLoginDate: "2021-08-12 17:53:04.083578",
      balance: 0
    });
    return this.save(newUserProfile);
  }
}
