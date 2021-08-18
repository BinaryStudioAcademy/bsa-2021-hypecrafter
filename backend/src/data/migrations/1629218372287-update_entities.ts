import {MigrationInterface, QueryRunner} from "typeorm";

export class updateEntities1629218372287 implements MigrationInterface {
    name = 'updateEntities1629218372287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_project" ADD "isFavorite" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user_project" ALTER COLUMN "isWatched" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "firstName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "lastName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "lastLoginDate" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "lastLoginDate" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "lastName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "firstName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_project" ALTER COLUMN "isWatched" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_project" DROP COLUMN "isFavorite"`);
    }

}
