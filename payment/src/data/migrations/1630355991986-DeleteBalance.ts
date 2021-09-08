import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteBalance1630355991986 implements MigrationInterface {
  name = 'DeleteBalance1630355991986';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "transaction_history" DROP COLUMN "balance"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "transaction_history" ADD "balance" money NOT NULL');
  }
}
