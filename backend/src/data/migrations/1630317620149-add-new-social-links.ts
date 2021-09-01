import {MigrationInterface, QueryRunner} from "typeorm";

export class addNewSocialLinks1630317620149 implements MigrationInterface {
    name = 'addNewSocialLinks1630317620149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profile" ADD "pinterestUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD "behanceUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "behanceUrl"`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "pinterestUrl"`);
    }

}
