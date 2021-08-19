import {MigrationInterface, QueryRunner} from "typeorm";

export class updateUserProfile1629365325498 implements MigrationInterface {
    name = 'updateUserProfile1629365325498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_project" DROP COLUMN "isFavorite"`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD "imageUrl" text`);
        await queryRunner.query(`ALTER TABLE "user_project" ALTER COLUMN "isWatched" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_project" ALTER COLUMN "isWatched" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "imageUrl"`);
        await queryRunner.query(`ALTER TABLE "user_project" ADD "isFavorite" boolean NOT NULL DEFAULT false`);
    }

}
