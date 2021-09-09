import {MigrationInterface, QueryRunner} from "typeorm";

export class addRecipientColumn1630611534657 implements MigrationInterface {
    name = 'addRecipientColumn1630611534657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" ADD "recipient" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "recipient"`);
    }

}
