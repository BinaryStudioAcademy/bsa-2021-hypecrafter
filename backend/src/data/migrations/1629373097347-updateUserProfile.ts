import {MigrationInterface, QueryRunner} from "typeorm";

export class updateUserProfile1629373097347 implements MigrationInterface {
    name = 'updateUserProfile1629373097347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "team_users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "teamId" uuid, "userId" uuid, CONSTRAINT "PK_b85b3455292dce115752be519eb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD "imageUrl" text`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "firstName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "lastName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "lastLoginDate" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "team_users" ADD CONSTRAINT "FK_0dc2044024bf4e74c54762606b7" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_users" ADD CONSTRAINT "FK_27d553c71d87166762da402a7fe" FOREIGN KEY ("userId") REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team_users" DROP CONSTRAINT "FK_27d553c71d87166762da402a7fe"`);
        await queryRunner.query(`ALTER TABLE "team_users" DROP CONSTRAINT "FK_0dc2044024bf4e74c54762606b7"`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "lastLoginDate" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "lastName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "firstName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "imageUrl"`);
        await queryRunner.query(`DROP TABLE "team_users"`);
    }

}
