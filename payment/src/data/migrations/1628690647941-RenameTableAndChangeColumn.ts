import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeColumns1628690647941 implements MigrationInterface {
  name = 'RenameTableAndChangeColumn1628690647941';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "transaction" RENAME TO "transaction_history";');
    await queryRunner.query('ALTER TABLE "transaction_history" ADD "item" character varying NOT NULL');
    await queryRunner.query('ALTER TABLE "transaction_history" ADD "balance" money NOT NULL');
    await queryRunner.query('ALTER TABLE "transaction_history" ADD "type" character varying NOT NULL');
    await queryRunner.query('ALTER TABLE "transaction_history" ADD "total" money NOT NULL');
    await queryRunner.query('ALTER TABLE "transaction_history" DROP COLUMN "projectId"');
    await queryRunner.query('ALTER TABLE "transaction_history" DROP COLUMN "amount"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "transaction_history" RENAME TO "transaction";');
    await queryRunner.query('ALTER TABLE "transaction_history" DROP COLUMN "item"');
    await queryRunner.query('ALTER TABLE "transaction_history" DROP COLUMN "balance"');
    await queryRunner.query('ALTER TABLE "transaction_history" DROP COLUMN "type"');
    await queryRunner.query('ALTER TABLE "transaction_history"  DROP COLUMN "total"');
    await queryRunner.query('ALTER TABLE "transaction_history" ADD "projectId" integer NOT NULL');
    await queryRunner.query('ALTER TABLE "transaction_history" ADD "amount" integer NOT NULL');
  }
}
