import {MigrationInterface, QueryRunner} from "typeorm";

export class addDefaultValueForLastLoginDate1629378372009 implements MigrationInterface {
    name = 'addDefaultValueForLastLoginDate1629378372009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "lastLoginDate" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "lastLoginDate" DROP DEFAULT`);
    }

}
