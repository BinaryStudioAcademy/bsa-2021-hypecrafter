import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFundingTable1628763766725 implements MigrationInterface {
    name = 'AddFundingTable1628763766725'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "funding" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" text NOT NULL, "projectId" uuid, CONSTRAINT "REL_714b6d8c1870167c49e98b8598" UNIQUE ("projectId"), CONSTRAINT "PK_096afc0d11a08deb52da61f039e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "funding" ADD CONSTRAINT "FK_714b6d8c1870167c49e98b85980" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_37fed92e2c01ac057b7815930b9" FOREIGN KEY ("fundingId") REFERENCES "funding"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_37fed92e2c01ac057b7815930b9"`);
        await queryRunner.query(`ALTER TABLE "funding" DROP CONSTRAINT "FK_714b6d8c1870167c49e98b85980"`);
        await queryRunner.query(`DROP TABLE "funding"`);
    }

}
