import { MigrationInterface, QueryRunner } from "typeorm";

export class defaultValueForBalenceAndLastLoginInUserProfile1628851705079 implements MigrationInterface {
    name = 'defaultValueForBalenceAndLastLoginInUserProfile1628851705079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "balance" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "lastLoginDate" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "balance" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "lastLoginDate" DROP DEFAULT`);
    }

}
