import { MigrationInterface, QueryRunner } from "typeorm";

export class changeDefaultValues1629718774213 implements MigrationInterface {
    name = 'changeDefaultValues1629718774213'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "totalViews" SET DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "minutesToRead" SET DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "totalInteractionTime" SET DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "totalInteractionTime" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "minutesToRead" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "totalViews" SET DEFAULT '0'`);
    }

}
