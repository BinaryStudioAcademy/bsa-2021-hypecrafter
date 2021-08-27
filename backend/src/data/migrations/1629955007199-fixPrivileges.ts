import {MigrationInterface, QueryRunner} from "typeorm";

export class fixPrivileges1629955007199 implements MigrationInterface {
    name = 'fixPrivileges1629955007199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donators_privilege" ADD "projectId" uuid`);
        await queryRunner.query(`ALTER TABLE "donators_privilege" ADD CONSTRAINT "UQ_8052990db82844eaf5e07b6fa8b" UNIQUE ("projectId")`);
        await queryRunner.query(`ALTER TABLE "project" ADD "donatorsPrivilegesId" uuid`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "UQ_040a70d3257e05d4d111c82af71" UNIQUE ("donatorsPrivilegesId")`);
        await queryRunner.query(`ALTER TABLE "donators_privilege" ADD CONSTRAINT "FK_8052990db82844eaf5e07b6fa8b" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_040a70d3257e05d4d111c82af71" FOREIGN KEY ("donatorsPrivilegesId") REFERENCES "donators_privilege"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_040a70d3257e05d4d111c82af71"`);
        await queryRunner.query(`ALTER TABLE "donators_privilege" DROP CONSTRAINT "FK_8052990db82844eaf5e07b6fa8b"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "UQ_040a70d3257e05d4d111c82af71"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "donatorsPrivilegesId"`);
        await queryRunner.query(`ALTER TABLE "donators_privilege" DROP CONSTRAINT "UQ_8052990db82844eaf5e07b6fa8b"`);
        await queryRunner.query(`ALTER TABLE "donators_privilege" DROP COLUMN "projectId"`);
    }

}
