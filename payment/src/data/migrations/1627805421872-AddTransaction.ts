import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTransaction1627805421872 implements MigrationInterface {
    name = 'AddTransaction1627805421872'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner
        .query(`CREATE TABLE "transaction" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
          "amount" integer NOT NULL,
          "userId" character varying NOT NULL,
          "projectId" character varying NOT NULL,
          CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id")
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE "transaction"');
    }
}