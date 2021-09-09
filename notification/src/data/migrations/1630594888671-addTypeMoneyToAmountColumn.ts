import {MigrationInterface, QueryRunner} from "typeorm";

export class addTypeMoneyToAmountColumn1630594888671 implements MigrationInterface {
    name = 'addTypeMoneyToAmountColumn1630594888671'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "amount" money`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "amount" integer`);
    }

}
