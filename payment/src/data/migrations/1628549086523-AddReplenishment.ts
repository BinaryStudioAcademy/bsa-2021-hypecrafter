import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddReplenishment1628549086523 implements MigrationInterface {
    name = 'AddReplenishment1628549086523'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner
        .query(`CREATE TABLE "replenishment" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
          "amount" integer NOT NULL,
          "userId" character varying NOT NULL,
          "type" character varying NOT NULL,
          CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab8" PRIMARY KEY ("id")
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE "replenishment"');
    }
}
