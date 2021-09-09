import {MigrationInterface, QueryRunner} from "typeorm";

export class addIsReadColumn1631049957223 implements MigrationInterface {
    name = 'addIsReadColumn1631049957223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" ADD "isRead" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "isRead"`);
    }

}
