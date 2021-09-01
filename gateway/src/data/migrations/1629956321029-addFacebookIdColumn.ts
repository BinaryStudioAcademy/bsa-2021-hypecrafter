import { MigrationInterface, QueryRunner } from "typeorm";

export class addFacebookIdColumn1629956321029 implements MigrationInterface {
    name = 'addFacebookIdColumn1629956321029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "facebookId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "facebookId"`);
    }

}
