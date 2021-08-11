import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeColumns1628690647941 implements MigrationInterface {
  name = "ChangeColumns1628690647941";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD "name" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD "balance" money NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD "type" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD "description" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD "total" money NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "projectId"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD "projectId" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD "amount" integer NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "balance"`);
    await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "type"`);
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP COLUMN "description"`
    );
    await queryRunner.query(`ALTER TABLE "transaction"  DROP COLUMN "total"`);
  }
}
