import {MigrationInterface, QueryRunner} from "typeorm";

export class addTablesRefresh1628873533429 implements MigrationInterface {
    name = 'addTablesRefresh1628873533429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ADD "imageUrl" text`);
        await queryRunner.query(`ALTER TABLE "project" ADD "instagramUrl" text`);
        await queryRunner.query(`ALTER TABLE "project" ADD "facebookUrl" text`);
        await queryRunner.query(`ALTER TABLE "project" ADD "dribbleUrl" text`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "balance" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "balance" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "dribbleUrl"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "facebookUrl"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "instagramUrl"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "imageUrl"`);
    }

}
