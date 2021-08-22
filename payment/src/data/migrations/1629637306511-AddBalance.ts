import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBalance1627805421872 implements MigrationInterface {
    name = 'AddBalance1627805421872'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner
        .query(`CREATE TABLE "balance" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
          "userId" character varying NOT NULL,
          "balance" money NOT NULL,
          CONSTRAINT "PK_89eadb93a89810556e1cbcd6fc9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE "balance"');
    }
}