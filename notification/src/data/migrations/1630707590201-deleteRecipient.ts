import {MigrationInterface, QueryRunner} from "typeorm";

export class deleteRecipient1630707590201 implements MigrationInterface {
    name = 'deleteRecipient1630707590201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "recipient"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job" ADD "recipient" character varying NOT NULL`);
    }

}
