import {MigrationInterface, QueryRunner} from "typeorm";

export class addGenderAndBirthdayColumnToUserProfile1628777136699 implements MigrationInterface {
    name = 'addGenderAndBirthdayColumnToUserProfile1628777136699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profile" ADD "gender" character varying`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD "birthday" character varying`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "balance" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "balance" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "gender"`);
    }

}
