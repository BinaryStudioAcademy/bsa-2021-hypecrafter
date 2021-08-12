import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateUserProfileEntity1628598112903 implements MigrationInterface {
    name = 'UpdateUserProfileEntity1628598112903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profile" ADD "rating" numeric NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD "instagramUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD "facebookUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD "dribbleUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "dribbleUrl"`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "facebookUrl"`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "instagramUrl"`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "rating"`);
    }

}
