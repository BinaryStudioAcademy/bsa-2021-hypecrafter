import {MigrationInterface, QueryRunner} from "typeorm";

export class addGoogleIdColumn1629637831811 implements MigrationInterface {
    name = 'addGoogleIdColumn1629637831811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "googleId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "googleId"`);
    }

}
