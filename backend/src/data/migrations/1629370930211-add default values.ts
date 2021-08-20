import { MigrationInterface, QueryRunner } from "typeorm";

export class addDefaultValues1629370930211 implements MigrationInterface {
    name = 'addDefaultValues1629370930211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "totalViews" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "minutesToRead" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "totalInteractionTime" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "totalInteractionTime" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "minutesToRead" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "totalViews" DROP DEFAULT`);
    }

}
