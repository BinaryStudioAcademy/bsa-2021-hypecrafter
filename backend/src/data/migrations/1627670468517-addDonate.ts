import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDonate1627670468517 implements MigrationInterface {
    name = 'addDonate1627670468517'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner
        .query(`CREATE TABLE "donate" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "amount" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
          "userProfileId" uuid,
          CONSTRAINT "PK_aa34cd4d591755337f6f3fd6c50" PRIMARY KEY ("id")
        )`);
      await queryRunner
        .query(`
          ALTER TABLE "donate"
          ADD CONSTRAINT "FK_1d5c852082a3e2134831e4d8058"
          FOREIGN KEY ("userProfileId")
          REFERENCES "user_profile"("id")
          ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "donate" DROP CONSTRAINT "FK_1d5c852082a3e2134831e4d8058"');
      await queryRunner.query('DROP TABLE "donate"');
    }
}
