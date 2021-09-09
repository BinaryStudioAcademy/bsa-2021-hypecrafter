import { MigrationInterface, QueryRunner } from "typeorm";

export class addAuthorIdColumn1630652085599 implements MigrationInterface {
    name = 'addAuthorIdColumn1630652085599'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_e89415fe16e98680d18ec760358"`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "authorId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_e89415fe16e98680d18ec760358" FOREIGN KEY ("authorId") REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_e89415fe16e98680d18ec760358"`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "authorId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_e89415fe16e98680d18ec760358" FOREIGN KEY ("authorId") REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
