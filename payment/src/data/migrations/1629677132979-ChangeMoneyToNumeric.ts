import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeMoneyToNumeric1629677132979 implements MigrationInterface {
  name = 'ChangeMoneyToNumeric1629677132979';
  
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM "transaction_history"');

    await queryRunner.query('ALTER TABLE "transaction_history"  DROP COLUMN "balance"');
    await queryRunner.query('ALTER TABLE "transaction_history"  DROP COLUMN "total"');
    await queryRunner.query('ALTER TABLE "balance"  DROP COLUMN "balance"');

    await queryRunner.query('ALTER TABLE "transaction_history" ADD "balance" numeric NOT NULL');
    await queryRunner.query('ALTER TABLE "transaction_history" ADD "total" numeric NOT NULL');
    await queryRunner.query('ALTER TABLE "balance" ADD "balance" numeric NOT NULL');

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "transaction_history"  DROP COLUMN "balance"');
    await queryRunner.query('ALTER TABLE "transaction_history"  DROP COLUMN "total"');
    await queryRunner.query('ALTER TABLE "balance"  DROP COLUMN "balance"');

    await queryRunner.query('ALTER TABLE "transaction_history" ADD "balance" money NOT NULL');
    await queryRunner.query('ALTER TABLE "transaction_history" ADD "total" money NOT NULL');
    await queryRunner.query('ALTER TABLE "balance" ADD "balance" money NOT NULL');
  }
}
