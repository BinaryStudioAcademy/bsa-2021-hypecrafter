import {MigrationInterface, QueryRunner} from "typeorm";

export class AddVideo1630013382804 implements MigrationInterface {
    name = 'AddVideo1630013382804'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ADD "videoUrl" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "videoUrl"`);
    }

}
